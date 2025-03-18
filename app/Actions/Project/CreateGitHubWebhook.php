<?php

namespace App\Actions\Project;

use App\Models\Project;
use App\Services\GitHub\GitHubApiService;
use Closure;
use Illuminate\Support\Facades\Auth;

class CreateGitHubWebhook
{
    protected GitHubApiService $githubApiService;

    public function __construct(GitHubApiService $githubApiService)
    {
        $this->githubApiService = $githubApiService;
    }

    public function handle($pipeline, Closure $next)
    {
        $project = $pipeline['project'];
        $repoData = $pipeline['data']['github_repo_data'] ?? null;
        $repoId = $pipeline['data']['project']['github_repo_id'] ?? null;

        if ($repoId && $repoData) {
            $this->createWebhook($project, $repoId, $repoData);
        }

        return $next($pipeline);
    }

    protected function createWebhook(Project $project, int $repoId, array $repoData): bool
    {
        try {
            $user = Auth::user();

            if (!$user || !$user->hasSocialProvider('github')) {
                logger()->warning('Cannot create GitHub webhook: Invalid user authentication', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);
                return false;
            }

            $this->githubApiService->setUser($user);

            if (!$repoData) {
                logger()->warning('Cannot create GitHub webhook: Repository information not provided', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);
                return false;
            }

            $nameParts = explode('/', $repoData['name'], 2);
            if (count($nameParts) !== 2) {
                logger()->warning('Cannot create GitHub webhook: Invalid repository name format', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                    'repo_name' => $repoData['name'],
                ]);
                return false;
            }

            $ownerLogin = $nameParts[0];
            $repoName = $nameParts[1];

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

            $result = $this->githubApiService->createWebhook($ownerLogin, $repoName, $webhookConfig);

            if ($result) {
                return true;
            }

            logger()->warning('GitHub webhook creation returned empty result', [
                'project_id' => $project->id,
                'repo_id' => $repoId,
            ]);

            return false;

        } catch (\Exception $e) {
            logger()->error('Error creating GitHub webhook', [
                'project_id' => $project->id,
                'repo_id' => $repoId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return false;
        }
    }
}
