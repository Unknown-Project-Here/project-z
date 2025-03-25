<?php

namespace App\Services;

use App\Actions\Project\Dashboard\GetApplicationAction;
use App\Actions\Project\Dashboard\GetApplicationsAction;
use App\Actions\Project\Dashboard\GetProjectDataAction;
use App\Actions\Project\Dashboard\GetProjectMembersAction;
use App\Actions\Project\Invite\GetEligibleUsers;
use App\Http\Requests\ProjectShowRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
        protected ProjectRequestService $projectRequestService
    ) {
    }

    public function handleShow(ProjectShowRequest $request, Project $project): Response|RedirectResponse
    {
        $validated = $request->validated();
        $activeTab = $validated['activeTab'] ?? 'dashboard';
        $activeSection = $validated['activeSection'] ?? null;
        $user = $request->user();

        if ($activeTab === 'members' && $activeSection === null) {
            $members = ($this->getProjectMembersAction)($project);

            return $this->renderDashboard($project, $activeTab, $activeSection, [
                'members' => $members,
            ]);
        }

        if ($activeTab === 'members' && $activeSection === 'view-applications') {
            $result = ($this->getApplicationsAction)($project, $user->id);

            return $this->renderDashboard($result['project'], $activeTab, $activeSection, [
                'applications' => $result['applications'],
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

        if ($activeTab === 'members' && $activeSection === 'application') {
            if (!isset($validated['application'])) {
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

        // Show page for non-members
        return Inertia::render('Project/Show', [
            'project' => $projectData,
        ]);
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
