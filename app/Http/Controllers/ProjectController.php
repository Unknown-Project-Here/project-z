<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
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

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
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

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project): Response|RedirectResponse
    {
        try {
            $projectData = $this->projectService->show($project);

            if ($request->user() && $request->user()->isMemberOf($project)) {
                return Inertia::render('Project/ProjectDashboard', [
                    'project' => $projectData,
                ]);
            }

            return Inertia::render('Project/Show', [
                'project' => $projectData,
            ]);
        } catch (\Exception $e) {
            logger($e->getMessage());
            logger($e->getTraceAsString());

            return back()->with([
                'success' => false,
                'message' => 'Failed to retrieve project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ]);
        }
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

    public function configureRequest(Project $project): Response
    {
        return Inertia::render('Project/Configure/Request', [
            'project' => $project,
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

    public function toggleRequestable(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('edit', $project)) {
            abort(403, 'You do not have permission to configure this project.');
        }

        $project->update(['is_requestable' => ! $project->is_requestable]);

        if ($project->is_requestable && $project->is_questions_configured && $project->repo_id && $project->is_configured === false) {
            $project->update(['is_configured' => true]);
        }

        $message = $project->is_requestable
            ? 'Users can now request to join this project.'
            : 'Users can no longer request to join this project.';

        return response()->json(['success' => true, 'message' => $message]);
    }

    public function markAsConfigured(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('edit', $project)) {
            abort(403, 'You do not have permission to configure this project.');
        }

        $project->update(['is_configured' => true]);

        return response()->json(['success' => true, 'message' => 'Project successfully configured.']);
    }

    public function request(Project $project): Response|RedirectResponse|JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
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

        return Inertia::render('Project/Request', [
            'project' => $project,
            'questions' => $questions,
            'socialUsernames' => $socialUsernames,
        ]);
    }
}
