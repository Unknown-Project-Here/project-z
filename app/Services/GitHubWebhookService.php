<?php

namespace App\Services;

use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\ProjectIssue;
use App\Models\ProjectIssueAssignee;
use App\Models\SocialAccount;
use Illuminate\Support\Facades\DB;

class GitHubWebhookService
{
    public function handleIssueOpened(array $payload): void
    {
        $repoId = $payload['repository']['id'];
        $project = $this->findProject($repoId);

        if (! $project) {
            return;
        }

        DB::transaction(function () use ($payload, $project) {
            $issue = $this->upsertIssue($project, $payload['issue'], 'open');

            $this->updateProjectIssueCount($project, $payload['repository']['open_issues_count']);

            if (! $issue) {
                return;
            }

            if (! empty($payload['issue']['assignees'])) {
                $this->addAssigneesToIssue($project, $issue, $payload['issue']['assignees']);
            }
        });
    }

    public function handleAssignedToIssue(array $payload): void
    {
        $repoId = $payload['repository']['id'];
        $project = $this->findProject($repoId);

        if (! $project) {
            return;
        }

        DB::transaction(function () use ($payload, $project) {
            $existingIssue = ProjectIssue::where([
                'project_id' => $project->id,
                'issue_id' => $payload['issue']['id'],
            ])->first();

            if ($existingIssue && $existingIssue->state === 'closed') {
                return;
            }

            $issue = $this->upsertIssue($project, $payload['issue']);

            $this->updateProjectIssueCount($project, $payload['repository']['open_issues_count']);

            if (! $issue || empty($payload['assignee'])) {
                return;
            }

            $this->addAssigneeToIssue($project, $issue, $payload['assignee']['id']);
        });
    }

    public function handleUnassignedFromIssue(array $payload): void
    {
        $repoId = $payload['repository']['id'];
        $project = $this->findProject($repoId);

        if (! $project) {
            return;
        }

        DB::transaction(function () use ($payload, $project) {
            $issue = ProjectIssue::where([
                'project_id' => $project->id,
                'issue_id' => $payload['issue']['id'],
            ])->first();

            $this->updateProjectIssueCount($project, $payload['repository']['open_issues_count']);

            if (! $issue) {
                return;
            }

            if ($issue->state === 'closed') {
                return;
            }

            if (! empty($payload['assignee'])) {
                $this->removeAssigneeFromIssue($issue, $payload['assignee']['id']);
            }

            if ($payload['issue']['state'] !== 'closed') {
                $issue->update(['state' => $payload['issue']['state']]);
            }
        });
    }

    public function handleIssueClosed(array $payload): void
    {
        $repoId = $payload['repository']['id'];
        $project = $this->findProject($repoId);

        if (! $project) {
            return;
        }

        DB::transaction(function () use ($payload, $project) {
            $this->upsertIssue($project, $payload['issue'], 'closed');

            $this->updateProjectIssueCount($project, $payload['repository']['open_issues_count']);
        });
    }

    public function handleIssueReopened(array $payload): void
    {
        $repoId = $payload['repository']['id'];
        $project = $this->findProject($repoId);

        if (! $project) {
            return;
        }

        DB::transaction(function () use ($payload, $project) {
            $issue = $this->upsertIssue($project, $payload['issue'], 'open');

            $this->updateProjectIssueCount($project, $payload['repository']['open_issues_count']);

            if (! $issue) {
                return;
            }

            $existingAssignees = ProjectIssueAssignee::where('project_issue_id', $issue->id)
                ->pluck('user_id')
                ->toArray();

            foreach ($existingAssignees as $userId) {
                $this->addUserToProjectIfNeeded($project, $userId);
            }

            if (! empty($payload['issue']['assignees'])) {
                $this->addAssigneesToIssue($project, $issue, $payload['issue']['assignees']);
            }
        });
    }

    private function updateProjectIssueCount(Project $project, int $issueCount): void
    {
        $project->update(['issue_count' => $issueCount]);
    }

    private function findProject(int $repoId): ?Project
    {
        return Project::where('repo_id', $repoId)->first();
    }

    private function getUserIdFromGithubId(int $githubUserId): ?int
    {
        return SocialAccount::where('provider', 'github')
            ->where('provider_id', $githubUserId)
            ->value('user_id');
    }

    private function addUserToProjectIfNeeded(Project $project, int $userId): void
    {
        $isProjectMember = $project->members()
            ->where('user_id', $userId)
            ->exists();

        if (! $isProjectMember) {
            $timestamp = now();
            $project->members()->attach($userId, [
                'role' => ProjectRole::CONTRIBUTOR,
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ]);
        }
    }

    private function upsertIssue(Project $project, array $issueData, ?string $state = null): ?ProjectIssue
    {
        $githubIssueId = $issueData['id'];
        $githubUserId = $issueData['user']['id'];

        $userId = $this->getUserIdFromGithubId($githubUserId);

        if (! $userId) {
            return null;
        }

        $issueState = $state ?? $issueData['state'];

        return ProjectIssue::updateOrCreate(
            [
                'project_id' => $project->id,
                'issue_id' => $githubIssueId,
            ],
            [
                'title' => $issueData['title'],
                'user_id' => $userId,
                'state' => $issueState,
                'url' => $issueData['html_url'] ?? $issueData['url'],
            ]
        );
    }

    private function addAssigneeToIssue(Project $project, ProjectIssue $issue, int $githubUserId): void
    {
        $userId = $this->getUserIdFromGithubId($githubUserId);

        if (! $userId) {
            return;
        }

        $this->addUserToProjectIfNeeded($project, $userId);

        ProjectIssueAssignee::updateOrCreate(
            [
                'project_issue_id' => $issue->id,
                'user_id' => $userId,
            ]
        );
    }

    private function addAssigneesToIssue(Project $project, ProjectIssue $issue, array $assignees): void
    {
        if (empty($assignees)) {
            return;
        }

        $githubUserIds = collect($assignees)->pluck('id')->toArray();

        $socialAccounts = SocialAccount::where('provider', 'github')
            ->whereIn('provider_id', $githubUserIds)
            ->get(['user_id', 'provider_id']);

        if ($socialAccounts->isEmpty()) {
            return;
        }

        $existingAssigneeUserIds = ProjectIssueAssignee::where('project_issue_id', $issue->id)
            ->pluck('user_id')
            ->toArray();

        foreach ($socialAccounts as $account) {
            if (in_array($account->user_id, $existingAssigneeUserIds)) {
                continue;
            }

            $this->addUserToProjectIfNeeded($project, $account->user_id);

            ProjectIssueAssignee::create([
                'project_issue_id' => $issue->id,
                'user_id' => $account->user_id,
            ]);
        }
    }

    private function removeAssigneeFromIssue(ProjectIssue $issue, int $githubUserId): void
    {
        $userId = $this->getUserIdFromGithubId($githubUserId);

        if (! $userId) {
            return;
        }

        ProjectIssueAssignee::where([
            'project_issue_id' => $issue->id,
            'user_id' => $userId,
        ])->delete();
    }
}
