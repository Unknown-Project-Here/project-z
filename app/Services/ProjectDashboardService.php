<?php

namespace App\Services;

use App\Actions\Project\Dashboard\GetApplicationAction;
use App\Actions\Project\Dashboard\GetApplicationsAction;
use App\Actions\Project\Dashboard\GetBlocklistAction;
use App\Actions\Project\Dashboard\GetProjectDataAction;
use App\Actions\Project\Dashboard\GetProjectMembersAction;
use App\Actions\Project\Dashboard\Issues\GetProjectIssuesAction;
use App\Actions\Project\Invite\GetEligibleUsers;
use App\Http\Requests\ProjectShowRequest;
use App\Models\Project;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProjectDashboardService
{
    public function __construct(
        protected GetProjectMembersAction $getProjectMembersAction,
        protected GetApplicationsAction $getApplicationsAction,
        protected GetEligibleUsers $getEligibleUsers,
        protected GetApplicationAction $getApplicationAction,
        protected GetProjectDataAction $getProjectDataAction,
        protected ProjectService $projectService,
        protected ProjectRequestService $projectRequestService,
        protected GetProjectIssuesAction $getProjectIssuesAction,
        protected GetBlocklistAction $getBlocklistAction
    ) {}

    public function handleShow(ProjectShowRequest $request, Project $project)
    {
        $validated = $request->validated();
        $activeTab = $validated['activeTab'] ?? 'dashboard';
        $activeSection = $validated['activeSection'] ?? null;
        $search = $validated['search'] ?? null;
        $user = $request->user();

        if (! $user || ! $user->isMemberOf($project)) {

            $projectData = $this->projectService->show($project);

            return Inertia::render('Project/Show', [
                'project' => $projectData,
            ]);

            abort(403, 'Unauthorized.');
        }

        if ($activeTab === 'settings' && $activeSection === null) {
            $projectData = ['id' => $project->id, 'title' => $project->title];

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'project' => $projectData,
            ]);
        }

        if ($activeTab === 'issues' && $activeSection === null) {
            $issues = ($this->getProjectIssuesAction)($project);

            $projectData = ['id' => $project->id];

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'project' => $projectData,
                'issues' => $issues,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === null && $search) {
            $members = ($this->getProjectMembersAction)($project, $search);

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'members' => $members,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === null) {
            $members = ($this->getProjectMembersAction)($project);

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'members' => $members,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === 'view-applications') {
            $result = ($this->getApplicationsAction)($project, $user->id);

            $applications = $result['applications'];

            $applications->withPath(route('projects.show', $project->id).'?activeTab=members&activeSection=view-applications');

            return $this->renderDashboard($result['project'], $activeTab, $activeSection, [
                'applications' => $applications,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === 'invite') {
            if ($user->cannot('invite', $project)) {
                abort(403, 'You do not have permission to invite users to this project.');
            }

            $users = [];
            if (isset($validated['search'])) {
                $users = ($this->getEligibleUsers)($project, $validated['search']);
            } else {
                $users = $this->getEmptyPaginationStructure();
            }

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'users' => $users,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === 'blocklist') {
            $blocklist = ($this->getBlocklistAction)($project, $search);

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'blocklist' => $blocklist,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === 'application') {
            if (! isset($validated['application'])) {
                abort(400, 'Application ID is required');
            }

            $result = $this->projectRequestService->getApplication(
                $project,
                (int) $validated['application'],
                request()->user()->id
            );

            return Inertia::render('Project/ProjectDashboard', [
                'project' => $result['project'],
                'activeTab' => $activeTab,
                'activeSection' => $activeSection,
                'application' => $result['application'],
            ]);

            return $this->renderDashboard($result['project'], $activeTab, $activeSection, [
                'application' => $result['application'],
            ]);
        }

        if ($activeTab === 'dashboard' && $activeSection === 'configure-questions') {
            return $this->renderDashboard($project, $activeTab, $activeSection);
        }

        $projectData = $this->projectService->show($project);

        if ($user && $user->isMemberOf($project)) {
            return $this->renderDashboard($projectData, $activeTab, $activeSection);
        }


    }

    private function renderDashboard(
        Project|array $project,
        string $activeTab,
        ?string $activeSection,
        array $additionalProps = []
    ): Response {
        return Inertia::render('Project/ProjectDashboard', array_merge([
            'project' => $project,
            'activeTab' => $activeTab,
            'activeSection' => $activeSection,
        ], $additionalProps));
    }

    private function getEmptyPaginationStructure(): array
    {
        return [
            'data' => [],
            'current_page' => 1,
            'first_page_url' => '',
            'from' => 0,
            'last_page' => 1,
            'last_page_url' => '',
            'links' => [],
            'next_page_url' => null,
            'path' => '',
            'per_page' => 20,
            'prev_page_url' => null,
            'to' => 0,
            'total' => 0,
        ];
    }
}
