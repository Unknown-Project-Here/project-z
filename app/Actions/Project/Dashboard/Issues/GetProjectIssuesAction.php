<?php

namespace App\Actions\Project\Dashboard\Issues;

use App\Models\Project;

class GetProjectIssuesAction
{
    public function __invoke(Project $project)
    {
        $projectArray['issues'] = $project->issues()
            ->with(['assignees.user', 'user'])
            ->paginate(20)
            ->through(function ($issue) {
                return [
                    'issue_id' => $issue->id,
                    'issue_title' => $issue->title,
                    'issue_url' => $issue->url,
                    'issue_state' => $issue->state,
                    'issue_creator' => [
                        'id' => $issue->user->id ?? null,
                        'avatar' => $issue->user->avatar ?? null,
                        'username' => $issue->user->username ?? null,
                    ],
                    'issue_assignees' => $issue->assignees->map(function ($assignee) {
                        return [
                            'id' => $assignee->user->id ?? null,
                            'avatar' => $assignee->user->avatar ?? null,
                            'username' => $assignee->user->username ?? null,
                        ];
                    })->toArray(),
                ];
            });

        return $projectArray['issues'];
    }
}
