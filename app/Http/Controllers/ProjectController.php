<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ProjectRenameRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Pipeline\Pipeline;
use App\Actions\Project\UpdateProjectTechStack;
use App\Actions\Onboarding\CreateMissingOptions;
use App\Actions\Project\AddMembersToProject; 
use Illuminate\Support\Facades\Log;

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
        $projects = Project::with('user')
            ->latest()
            ->paginate($perPage);

        if ($request->wantsJson()) {
            return response()->json([
                'data' => $projects,
                'message' => 'Projects retrieved successfully.'
            ]);
        }

        return Inertia::render('Project/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(Request $request): Response
    {
        $this->authorize('create', Project::class);
        
        return Inertia::render('Project/Create', [
            'user' => Auth::user()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Project $project): Response|JsonResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'data' => $project->load('user'),
                'message' => 'Project retrieved successfully.'
            ]);
        }

        return Inertia::render('Project/Show', [
            'project' => $project->load('user')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request): JsonResponse
    {
        $this->authorize('create', Project::class);

        try {
            return DB::transaction(function () use ($request) {
                // Convert contact object to JSON string before validation/processing
                $validatedData = $request->validated();
                
                // Debug log
                Log::info('Validated data before processing:', $validatedData);
                
                // Ensure project data exists
                $validatedData['project'] = $validatedData['project'] ?? [];
                
                // Debug log after modifications
                Log::info('Validated data after processing:', $validatedData);

                $project = app(Pipeline::class)
                    ->send($validatedData)
                    ->through([
                        CreateMissingOptions::class,
                        UpdateProjectTechStack::class,
                        AddMembersToProject::class,
                    ])
                    ->then(function ($data) {
                        Log::info('Pipeline result:', ['data' => $data]);
                        return $data;
                    });

                return response()->json([
                    'success' => true,
                    'data' => $project->load(['user', 'members']),
                    'message' => 'Project created successfully.'
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error('Project creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create project.',
                'error' => config('app.debug') ? $e->getMessage() : null
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
            'project' => $project->load('user')
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
                'message' => 'Project updated successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update project.',
                'error' => config('app.debug') ? $e->getMessage() : null
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
                'message' => 'Project deleted successfully.'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete project.',
                'error' => config('app.debug') ? $e->getMessage() : null
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
                'message' => 'Project renamed successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to rename project.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
