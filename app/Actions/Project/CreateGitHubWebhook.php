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
        $data = $pipeline['data'];

        if (isset($data['project']['github_repo_id']) && $data['project']['github_repo_id']) {
            $this->createWebhook($project, $data['project']['github_repo_id']);
        }

        return $next($pipeline);
    }

    protected function createWebhook(Project $project, int $repoId): bool
    {
        try {
            $user = Auth::user();

            if (! $user || ! $user->hasSocialProvider('github')) {
                logger()->warning('Cannot create GitHub webhook: User not authenticated or no GitHub provider', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);

                return false;
            }

            $accessToken = $user->getAccessToken('github');
            if (! $accessToken) {
                logger()->warning('Cannot create GitHub webhook: No access token available', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);

                return false;
            }

            $this->githubApiService->setUser($user);
            $repositories = $this->githubApiService->getRepositories();

            if (! $repositories) {
                logger()->warning('Cannot create GitHub webhook: Unable to fetch repositories', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);

                return false;
            }

            $repoInfo = null;
            foreach ($repositories as $repo) {
                if ($repo['id'] === $repoId) {
                    $repoInfo = $repo;
                    break;
                }
            }

            if (! $repoInfo) {
                logger()->warning('Cannot create GitHub webhook: Repository not found', [
                    'project_id' => $project->id,
                    'repo_id' => $repoId,
                ]);

                return false;
            }

            $owner = $repoInfo['owner']['login'];
            $repoName = $repoInfo['name'];

            $webhookData = [
                'name' => 'web',
                'config' => [
                    'url' => 'https://project-z.test/github/webhook',
                    'content_type' => 'json',
                    'secret' => config('github-webhooks.signing_secret'),
                    'insecure_ssl' => '0',
                ],
                'events' => ['ping', 'issues'],
                'active' => true,
            ];

            $this->githubApiService->createWebhook($owner, $repoName, $webhookData);

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
