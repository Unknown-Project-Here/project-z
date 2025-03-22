<?php

namespace App\Services;

use App\Actions\Options\CreateMissingOptions;
use App\Actions\Project\AssignCreatorRole;
use App\Actions\Project\CreateGitHubWebhook;
use App\Actions\Project\CreateProject;
use App\Actions\Project\CreateProjectTechStack;
use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\User;
use App\Services\GitHub\GitHubApiService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Validation\ValidationException;

class ProjectService
{
    protected GitHubApiService $githubApiService;

    public function __construct(GitHubApiService $githubApiService)
    {
        $this->githubApiService = $githubApiService;
    }

    /**
     * Store a new project.
     *
     * @param  array  $validatedData  The validated request data
     * @return array Response with project and status information
     */
    public function store(array $validatedData): array
    {
        try {
            $githubRepoData = null;
            if (isset($validatedData['project']['github_repo_id']) && $validatedData['project']['github_repo_id']) {
                $githubRepoData = $this->validateGithubRepoId($validatedData['project']['github_repo_id']);
            }

            return DB::transaction(function () use ($validatedData, $githubRepoData) {
                // Create missing options
                $options = ['skills' => $validatedData['project']['skills']];
                app()->make(CreateMissingOptions::class)
                    ->handle($options, function ($data) {
                        return $data;
                    });

                if (isset($validatedData['project']['github_repo_id']) && $validatedData['project']['github_repo_id']) {
                    $validatedData['project']['repo_id'] = $validatedData['project']['github_repo_id'];
                }

                if ($githubRepoData) {
                    $validatedData['github_repo_data'] = $githubRepoData;
                }

                $project = Pipeline::send($validatedData)
                    ->through([
                        CreateProject::class,
                        CreateProjectTechStack::class,
                        AssignCreatorRole::class,
                        CreateGitHubWebhook::class,
                    ])
                    ->then(function ($data) {
                        return $data['project'];
                    });

                return [
                    'success' => true,
                    'message' => 'Project created successfully.',
                    'project' => $project,
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
     * @param  int  $repoId  The GitHub repository ID
     * @return bool True if the repository is valid
     *
     * @throws ValidationException If the repository is invalid
     */
    private function validateGithubRepoId(int $repoId): ?array
    {
        $user = Auth::user();

        if (! $user->hasSocialProvider('github')) {
            throw ValidationException::withMessages([
                'github_repo_id' => 'You must connect your GitHub account to add a repository.',
            ]);
        }

        $this->githubApiService->setUser($user);
        $repos = $this->githubApiService->getPersonandOrganizationRepos();

        if (! $repos) {
            throw ValidationException::withMessages([
                'github_repo_id' => 'Unable to fetch your GitHub repositories.',
            ]);
        }

        $allRepos = collect($repos['public'])
            ->merge($repos['private'])
            ->merge($repos['orgs']);

        $repoData = $allRepos->first(function ($repo) use ($repoId) {
            return $repo['id'] === $repoId;
        });

        if (! $repoData) {
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

        return $repoData;
    }

    /**
     * Get GitHub repositories for project creation form.
     *
     * @return array GitHub repositories filtered by those not already used in projects
     */
    public function getRepositoriesForProjectCreation(): array
    {
        $user = Auth::user();

        if (! $user || ! $user->hasSocialProvider('github') || ! $user->getAccessToken('github')) {
            return [
                'public' => [],
                'private' => [],
                'orgs' => [],
            ];
        }

        $this->githubApiService->setUser($user);
        $repos = $this->githubApiService->getPersonandOrganizationRepos();

        if (! $repos) {
            return [
                'public' => [],
                'private' => [],
                'orgs' => [],
            ];
        }

        $allRepoIds = [];
        foreach (['public', 'private', 'orgs'] as $repoType) {
            if (isset($repos[$repoType])) {
                $repoIds = collect($repos[$repoType])->pluck('id')->toArray();
                $allRepoIds = array_merge($allRepoIds, $repoIds);
            }
        }

        $usedRepoIds = [];
        if (! empty($allRepoIds)) {
            $usedRepoIds = Project::whereIn('repo_id', $allRepoIds)->pluck('repo_id')->toArray();
        }

        $filteredRepos = [];
        foreach (['public', 'private', 'orgs'] as $repoType) {
            if (! isset($repos[$repoType])) {
                $filteredRepos[$repoType] = [];

                continue;
            }

            $filteredRepos[$repoType] = collect($repos[$repoType])
                ->filter(function ($repo) use ($usedRepoIds) {
                    return ! in_array($repo['id'], $usedRepoIds);
                })
                ->values()
                ->toArray();
        }

        return $filteredRepos;
    }

    public function show(Project $project): array
    {
        $project->load(['stack.option.category', 'members']);

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

        $user = Auth::user();

        if ($user) {
            $memberPivot = $project->members()->where('user_id', $user->id)->first()?->pivot;

            if ($memberPivot && in_array($memberPivot->role, [ProjectRole::CREATOR, ProjectRole::ADMIN])) {
                $mustConfigure = [];

                $mustConfigure['questions'] = ! $project->is_questions_configured;

                $mustConfigure['members_request'] = ! $project->is_requestable;

                $mustConfigure['repo'] = ! $project->repo_id;

                if (! empty($mustConfigure)) {
                    $projectArray['must_configure'] = (object) $mustConfigure;
                }
            }
        }

        return $projectArray;
    }

    /**
     * Save project application questions
     *
     * @param  Project  $project  The project to save the questions for
     * @param  array  $questionsData  An array of questions with text and optional status
     * @return array Response with status information
     */
    public function saveApplicationQuestions(Project $project, array $questionsData): array
    {
        try {
            return DB::transaction(function () use ($project, $questionsData) {

                if (empty($questionsData)) {
                    $project->update(['is_questions_configured' => true]);

                    return [
                        'success' => true,
                        'message' => 'Project configured with no application questions.',
                    ];
                }

                foreach ($questionsData as $questionData) {
                    $project->applicationQuestions()->create([
                        'question' => $questionData['text'],
                        'is_optional' => $questionData['optional'] ?? false,
                    ]);
                }

                $project->update([
                    'is_questions_configured' => true,
                ]);

                return [
                    'success' => true,
                    'message' => 'Application questions saved successfully.',
                ];
            });
        } catch (\Exception $e) {

            return [
                'success' => false,
                'message' => 'Failed to save application questions.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ];
        }
    }

    public function connectRepository(User $user, Project $project, array $repoData): void
    {
        $project->update([
            'repo_id' => $repoData['id'],
        ]);

        $webhookConfig = [
            'name' => 'web',
            'config' => [
                'url' => config('services.github.webhook_url'),
                'content_type' => 'json',
                'secret' => config('github-webhooks.signing_secret'),
                'insecure_ssl' => '0',
            ],
            'events' => ['ping', 'issues'],
            'active' => true,
        ];

        $this->githubApiService->setUser($user);
        $this->githubApiService->createWebhook($repoData['owner'], $repoData['name'], $webhookConfig);
    }
}
