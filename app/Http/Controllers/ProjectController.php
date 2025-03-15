<?php

namespace App\Http\Controllers;

use App\Actions\Options\CreateMissingOptions;
use App\Actions\Project\AssignCreatorRole;
use App\Actions\Project\CreateProject;
use App\Actions\Project\CreateProjectTechStack;
use App\Http\Requests\ProjectRenameRequest;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Pipeline;
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

        return inertia('Project/Create', [
            'usernames' => $socialUsernames,
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
    public function store(ProjectRequest $request): RedirectResponse|JsonResponse
    {
        $this->authorize('create', Project::class);

        try {
            return DB::transaction(function () use ($request) {
                $validatedData = $request->validated();

                // Create missing options
                $options = ['skills' => $validatedData['project']['skills']];
                app()->make(CreateMissingOptions::class)
                    ->handle($options, function ($data) {
                        return $data;
                    });

                // Create project and related data
                $pipeline = Pipeline::send($validatedData)
                    ->through([
                        CreateProject::class,
                        CreateProjectTechStack::class,
                        AssignCreatorRole::class,
                    ])
                    ->then(function ($data) {
                        return $data['project'];
                    });

                return redirect()->route('projects.show', $pipeline->id)->with(['success' => true, 'message' => 'Project created successfully.']);
            });
        } catch (\Exception $e) {
            Log::error('Project creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): Response
    {
        // Check if the authenticated user is the project owner
        if ($project->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $this->authorize('update', $project);

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
