<?php

namespace App\Http\Controllers;

use App\Actions\Project\Invite\GetEligibleUsers;
use App\Http\Requests\ProjectShowRequest;
use App\Models\Project;
use App\Models\ProjectRequest;
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
        $this->authorize('edit', $project);

        return Inertia::render('Project/Edit', [
            'project' => $project->load('user'),
        ]);
    }

    /**
     * Save application questions for the project.
     */
    public function saveApplicationQuestions(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('edit', $project)) {
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

            if ($request->user()->cannot('edit', $project)) {
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
            Gate::inspect('edit', $project);

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
}
