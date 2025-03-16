<?php

namespace App\Services;

use App\Actions\Options\CreateMissingOptions;
use App\Actions\Project\AssignCreatorRole;
use App\Actions\Project\CreateProject;
use App\Actions\Project\CreateProjectTechStack;
use App\Models\Project;
use App\Models\User;
use App\Services\GitHub\GitHubApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Validation\ValidationException;

class ProjectService
{
    /**
     * Store a new project.
     *
     * @param array $validatedData The validated request data
     * @return array Response with project and status information
     */
    public function store(array $validatedData): array
    {
        try {
            if (isset($validatedData['project']['github_repo_id']) && $validatedData['project']['github_repo_id']) {
                $this->validateGithubRepoId($validatedData['project']['github_repo_id']);
            }

            return DB::transaction(function () use ($validatedData) {
                // Create missing options
                $options = ['skills' => $validatedData['project']['skills']];
                app()->make(CreateMissingOptions::class)
                    ->handle($options, function ($data) {
                        return $data;
                    });

                // Add repo_id to project data if GitHub repo ID was provided and validated
                if (isset($validatedData['project']['github_repo_id']) && $validatedData['project']['github_repo_id']) {
                    $validatedData['project']['repo_id'] = $validatedData['project']['github_repo_id'];
                }

                $project = Pipeline::send($validatedData)
                    ->through([
                        CreateProject::class,
                        CreateProjectTechStack::class,
                        AssignCreatorRole::class,
                    ])
                    ->then(function ($data) {
                        return $data['project'];
                    });

                return [
                    'success' => true,
                    'message' => 'Project created successfully.',
                    'project' => $project
                ];
            });
        } catch (ValidationException $e) {
            Log::error('Project validation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => $e->getMessage(),
                'error' => config('app.debug') ? $e->getMessage() : null,
            ];
        } catch (\Exception $e) {
            Log::error('Project creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => 'Failed to create project.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ];
        }
    }

    /**
     * Validate that the GitHub repository ID exists, belongs to the user, and is not already used.
     *
     * @param int $repoId The GitHub repository ID
     * @throws ValidationException If the repository is invalid
     * @return bool True if the repository is valid
     */
    private function validateGithubRepoId(int $repoId): bool
    {
        $user = Auth::user();

        if (!$user->hasSocialProvider('github')) {
            throw ValidationException::withMessages([
                'github_repo_id' => 'You must connect your GitHub account to add a repository.',
            ]);
        }

        $userRepos = $user->getGithubRepos() ?? throw ValidationException::withMessages([
            'github_repo_id' => 'Unable to fetch your GitHub repositories.',
        ]);

        $repoExists = collect($userRepos['public'] ?? [])
            ->merge($userRepos['private'] ?? [])
            ->contains(fn($repo) => $repo['id'] === $repoId);

        if (!$repoExists) {
            throw ValidationException::withMessages([
                'github_repo_id' => 'The selected GitHub repository does not exist or does not belong to you.',
            ]);
        }

        $existingProject = Project::where('repo_id', $repoId)->first();
        if ($existingProject) {
            throw ValidationException::withMessages([
                'github_repo_id' => 'This repository is already being used by another project.',
            ]);
        }

        return true;
    }
}
