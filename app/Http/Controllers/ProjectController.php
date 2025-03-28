<?php

namespace App\Http\Controllers;

use App\Actions\Project\Invite\GetEligibleUsers;
use App\Enums\ProjectRole;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\ProjectShowRequest;
use App\Models\Project;
use App\Models\ProjectIssueAssignee;
use App\Models\User;
use App\Services\ProjectDashboardService;
use App\Services\ProjectRequestService;
use App\Services\ProjectService;
use Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    protected ProjectService $projectService;

    protected ProjectRequestService $projectRequestService;

    protected GetEligibleUsers $getEligibleUsers;

    protected ProjectDashboardService $projectDashboardService;

    public function __construct(
        ProjectService $projectService,
        ProjectRequestService $projectRequestService,
        GetEligibleUsers $getEligibleUsers,
        ProjectDashboardService $projectDashboardService
    ) {
        $this->projectService = $projectService;
        $this->projectRequestService = $projectRequestService;
        $this->getEligibleUsers = $getEligibleUsers;
        $this->projectDashboardService = $projectDashboardService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $request->validate([
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1',
        ]);

        $perPage = $request->input('per_page', 9);
        $projects = Project::with(['user', 'stack.option.category', 'members'])
            ->latest()
            ->paginate($perPage);

        $transformed = collect($projects->items())->map(function ($project) {
            $projectArray = $project->toArray();

            // Transform stack into flat array
            $stackArray = collect($project->stack)
                ->map(fn ($item) => [
                    'id' => $item->option->id,
                    'name' => $item->option->name,
                    'skill_level' => $item->skill_level,
                ]);

            $projectArray['stack'] = $stackArray;
            $projectArray['creator'] = $project->creator;

            return $projectArray;
        });

        if ($request->wantsJson()) {
            return response()->json([
                'data' => $transformed,
                'message' => 'Projects retrieved successfully.',
            ]);
        }

        return Inertia::render('Project/Index', [
            'projects' => $transformed,
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create()
    {
        $this->authorize('create', Project::class);

        $user = Auth::user();
        $socialUsernames = $user->getSocialUsernames();
        $repos = $this->projectService->getRepositoriesForProjectCreation();

        return inertia('Project/Create', [
            'usernames' => $socialUsernames,
            'repos' => $repos,
        ]);
    }

    public function show(ProjectShowRequest $request, Project $project): Response|RedirectResponse
    {
        return $this->projectDashboardService->handleShow($request, $project);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request): RedirectResponse|JsonResponse
    {
        $this->authorize('create', Project::class);

        $result = $this->projectService->store($request->validated());

        if ($result['success']) {
            return redirect()->route('projects.show', $result['project']->id)
                ->with(['success' => true, 'message' => $result['message']]);
        }

        return response()->json([
            'success' => false,
            'message' => $result['message'],
            'error' => $result['error'] ?? null,
        ], 500);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): Response
    {
        $user = Auth::user();

        abort_if(! $user, 403, 'Unauthorized.');
        abort_if($user->cannot('manage', $project), 403, 'Unauthorized.');

        $projectData = $project->only([
            'id',
            'title',
            'description',
            'is_active',
            'is_requestable',
        ]);

        return Inertia::render('Project/Edit', [
            'project' => $projectData,
        ]);
    }

    /**
     * Save application questions for the project.
     */
    public function saveApplicationQuestions(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('manage', $project)) {
            abort(403, 'You do not have permission to configure this project.');
        }

        $validated = $request->validate([
            'questions' => 'present|array',
            'questions.*.text' => 'required|string|max:500',
            'questions.*.optional' => 'boolean',
        ]);

        $result = $this->projectService->saveApplicationQuestions(
            $project,
            $validated['questions']
        );

        if ($result['success']) {
            return response()->json([
                'success' => true,
                'message' => $result['message'],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => $result['message'],
            'error' => $result['error'] ?? null,
        ], 500);
    }

    public function handleAllowRequestConfiguration(Request $request, Project $project): JsonResponse
    {
        try {
            $validated = $request->validate([
                'is_requestable' => 'required|boolean',
            ]);

            if ($request->user()->cannot('manage', $project)) {
                abort(403, 'You do not have permission to configure this project.');
            }

            $project->configuration->update([
                'is_requestable' => $validated['is_requestable'],
                'request_configured_at' => now(),
            ]);

            $project->refresh();

            $message = $project->configuration->is_requestable
                ? 'Configured - Users can now request to join this project.'
                : 'Configured - Users cannot request to join this project.';

            return response()->json(['success' => true, 'message' => $message]);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to configure request configuration.',
            ], 500);
        }
    }

    public function request(Project $project): Response|RedirectResponse|JsonResponse
    {
        $user = Auth::user();

        if (! $user) {
            return to_route('login');
        }

        if ($user->isMemberOf($project)) {
            return to_route('projects.show', $project->id);
        }

        if (! $user->can('request', $project)) {
            abort(403, 'You do not have permission to request to join this project.');
        }

        $socialUsernames = $user->getSocialUsernames();
        $questions = $project->applicationQuestions;

        return Inertia::render('Project/ProjectRequestApplicationForm', [
            'project' => $project,
            'questions' => $questions,
            'socialUsernames' => $socialUsernames,
        ]);
    }

    public function connectRepository(Request $request, Project $project): JsonResponse
    {
        try {
            Gate::inspect('manage', $project);

            $user = Auth::user();

            $validated = $request->validate([
                'repo' => 'required|array',
                'repo.id' => 'required|integer',
                'repo.name' => 'required|string',
                'repo.owner' => 'required|string',
            ]);

            $repoExists = Project::where('repo_id', $validated['repo']['id'])->exists();

            if ($repoExists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Repository already connected.',
                ], 400);
            }

            $this->projectService->connectRepository($user, $project, $validated['repo']);

            return response()->json([
                'success' => true,
                'message' => 'Repository connected successfully.',
            ]);
        } catch (\Exception $e) {
            logger($e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to connect repository.',
            ], 500);
        }
    }

    public function removeMember(Project $project, User $user)
    {
        $requestUser = Auth::user();

        if (! $requestUser) {
            return to_route('login', [], 302);
        }

        if ($requestUser->cannot('removeMember', $project)) {
            abort(403, 'You do not have permission to remove members from this project.');
        }

        if ($user->id === $requestUser->id) {
            abort(403, 'You cannot remove yourself from this project.');
        }

        $requestUserRole = $requestUser->getRole($project);
        $targetUserRole = $user->getRole($project);

        $roleHierarchy = $this->getRoleHierarchy();

        if ($roleHierarchy[$targetUserRole] >= $roleHierarchy[$requestUserRole]) {
            abort(403, 'You cannot remove a member with the same or higher role.');
        }

        $project->blacklistedUsers()->create([
            'user_id' => $user->id,
            'project_id' => $project->id,
        ]);

        try {
            $project->issues()->where('user_id', $user->id)->delete();
            ProjectIssueAssignee::where('user_id', $user->id)->delete();
            $project->members()->detach($user);

            return response()->json([
                'success' => true,
                'message' => 'Member removed successfully',
            ], 200);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to remove member',
            ], 500);
        }
    }

    public function updateMemberRole(Request $request, Project $project)
    {
        $validated = $request->validate([
            'role' => 'required|string|in:creator,admin,contributor',
            'user_id' => 'required|integer|exists:project_user,user_id',
        ]);

        $requestUser = Auth::user();
        $targetUser = User::find($validated['user_id']);

        $newRole = $validated['role'];

        if (! $requestUser) {
            return to_route('login', [], 302);
        }

        abort_if($requestUser->id === $targetUser->id, 403, 'You cannot update your own role.');

        abort_if($requestUser->cannot('updateMemberRole', $project), 403, 'You do not have permission to update member roles in this project.');

        $roleHierarchy = $this->getRoleHierarchy();
        $requestUserRole = $requestUser->getRole($project);
        $targetUserRole = $targetUser->getRole($project);

        abort_if($targetUserRole === $newRole, 403, 'Cannot update to the same role the user already has.');

        if ($requestUserRole !== ProjectRole::CREATOR) {
            abort_if($newRole === ProjectRole::CREATOR, 403, 'Only project creators can assign the creator role.');
            abort_if($roleHierarchy[$targetUserRole] >= $roleHierarchy[$requestUserRole],
                403,
                'You cannot update the role of a member with the same or higher role.'
            );
        }

        try {
            $project->members()->updateExistingPivot($targetUser->id, ['role' => $newRole]);

            return response()->json([
                'success' => true,
                'message' => 'Member role updated successfully',
            ], 200);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update member role',
            ], 500);
        }
    }

    public function removeFromBlocklist(Request $request, Project $project)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:project_user_blacklists,user_id',
        ]);

        $requestUser = Auth::user();
        $targetUser = User::find($validated['user_id']);

        if (! $requestUser) {
            return to_route('login', [], 302);
        }

        abort_if($requestUser->cannot('reinstateMember', $project), 403, 'Unauthorized.');
        abort_if($targetUser->id === $requestUser->id, 403, 'Unauthorized.');

        try {
            $project->blacklistedUsers()->where('user_id', $targetUser->id)->delete();

            return response()->json([
                'success' => true,
                'message' => $targetUser->username.' removed from blocklist successfully',
            ], 200);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to reinstate member',
            ], 500);
        }

    }

    public function updateTitleAndDescription(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'required|string|max:200',
            'project_id' => 'required|integer|exists:projects,id',
        ]);

        $project = Project::find($validated['project_id']);

        abort_if($user->cannot('manage', $project), 403, 'Forbidden.');

        try {
            $project->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
            ], 200);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update project',
            ], 500);
        }
    }

    public function handleUpdateStatusAndRequestable(Request $request)
    {
        try {
            $user = Auth::user();

            $validated = $request->validate([
                'is_active' => 'required|boolean',
                'is_requestable' => 'required|boolean',
                'project_id' => 'required|integer|exists:projects,id',
            ]);

            $project = Project::find($validated['project_id']);

            abort_if($user->cannot('manage', $project), 403, 'Forbidden.');

            $project->update(['is_active' => $validated['is_active']]);
            $project->configuration->update(['is_requestable' => $validated['is_requestable']]);

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
            ], 200);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update project',
            ], 500);
        }
    }

    private function getRoleHierarchy(): array
    {
        return [
            'creator' => 3,
            'admin' => 2,
            'contributor' => 1,
        ];
    }
}
