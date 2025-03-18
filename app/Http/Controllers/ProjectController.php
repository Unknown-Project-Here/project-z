<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRenameRequest;
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
    public function create(Request $request)
    {
        $this->authorize('create', Project::class);

        $user = Auth::user();
        $socialUsernames = $user->getSocialUsernames();
        $repos = $user->getGithubRepos();

        return inertia('Project/Create', [
            'usernames' => $socialUsernames,
            'repos' => $repos,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): Response|JsonResponse|RedirectResponse
    {
        try {
            $project->load(['stack.option.category', 'members']);

            // Organize stack by categories
            $stackByCategory = collect($project->stack)
                ->groupBy(fn ($stack) => $stack->option->category->name)
                ->map(fn ($items) => $items->map(fn ($item) => [
                    'id' => $item->option->id,
                    'name' => $item->option->name,
                    'skill_level' => $item->skill_level,
                ]));

            $projectArray = $project->toArray();
            $projectArray['stack'] = $stackByCategory;
            $projectArray['creator'] = $project->creator;

            return Inertia::render('Project/Show', [
                'project' => $projectArray,
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
    public function store(ProjectRequest $request, ProjectService $projectService): RedirectResponse|JsonResponse
    {
        $this->authorize('create', Project::class);

        $result = $projectService->store($request->validated());

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
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        try {
            $project->update($request->validated());

            return response()->json([
                'success' => true,
                'data' => $project->fresh()->load('user'),
                'message' => 'Project updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): JsonResponse
    {
        if (request()->user()->cannot('delete', $project)) {
            abort(403, 'You do not have permission to delete this project.');
        }

        try {
            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully.',
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Rename the specified project.
     */
    public function rename(ProjectRenameRequest $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('rename', $project)) {
            abort(403, 'You do not have permission to rename this project.');
        }

        try {
            $project->update(['title' => $request->title]);

            return response()->json([
                'success' => true,
                'data' => $project->fresh(),
                'message' => 'Project renamed successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to rename project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}
