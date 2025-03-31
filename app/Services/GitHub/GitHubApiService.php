<?php

namespace App\Services\GitHub;

use App\Models\User;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class GitHubApiService
{
    private const GITHUB_API_BASE = 'https://api.github.com';

    private const PROVIDER = 'github';

    private ?User $user = null;

    private PendingRequest $httpClient;

    public function __construct()
    {
        $this->httpClient = Http::withHeaders([
            'Accept' => 'application/vnd.github.v3+json',
            'User-Agent' => 'Laravel-GitHub-App',
        ])->baseUrl(self::GITHUB_API_BASE);
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getRepositories(): ?array
    {
        if (! $this->user) {
            return null;
        }

        $accessToken = $this->user->getAccessToken(self::PROVIDER);

        if (! $accessToken) {
            return null;
        }

        try {
            $response = $this->httpClient
                ->withToken($accessToken)
                ->get('/user/repos');

            $response->throw();

            return $response->json();
        } catch (RequestException $e) {
            logger()->error('GitHub API request failed: '.$e->getMessage());
            throw $e;
        }
    }

    public function getOrganizations(): ?array
    {
        if (! $this->user) {
            return null;
        }

        $accessToken = $this->user->getAccessToken(self::PROVIDER);

        if (! $accessToken) {
            return null;
        }

        try {
            $response = $this->httpClient
                ->withToken($accessToken)
                ->get('/user/orgs');

            $response->throw();

            return $response->json();
        } catch (RequestException $e) {
            logger()->error('GitHub API request failed: '.$e->getMessage());
            throw $e;
        }
    }

    public function getOrganizationRepos(string $login)
    {
        if (! $this->user) {
            return null;
        }

        $accessToken = $this->user->getAccessToken(self::PROVIDER);

        if (! $accessToken) {
            return null;
        }

        try {
            $response = $this->httpClient
                ->withToken($accessToken)
                ->get("/orgs/{$login}/repos");

            $response->throw();

            return $response->json();
        } catch (RequestException $e) {
            logger()->error('GitHub API request failed: '.$e->getMessage());
            throw $e;
        }
    }

    /**
     * Create a webhook for a GitHub repository
     *
     * @param  string  $owner  The repository owner (username or organization)
     * @param  string  $repo  The repository name
     * @param  array  $webhookData  The webhook configuration data
     * @return array|null The created webhook data or null on failure
     */
    public function createWebhook(string $owner, string $repo, array $webhookData): ?array
    {
        if (! $this->user) {
            return null;
        }

        $accessToken = $this->user->getAccessToken(self::PROVIDER);

        if (! $accessToken) {
            return null;
        }

        try {
            $response = $this->httpClient
                ->withToken($accessToken)
                ->post("/repos/{$owner}/{$repo}/hooks", $webhookData);

            $response->throw();

            return $response->json();
        } catch (RequestException $e) {
            logger()->error('GitHub webhook creation failed: '.$e->getMessage(), [
                'owner' => $owner,
                'repo' => $repo,
                'status' => $e->response?->status(),
                'body' => $e->response?->body(),
            ]);

            return null;
        }
    }

    /**
     * Get repositories categorized by public, private, and organization repositories
     * where the user has admin permissions
     *
     * @return array|null Categorized repositories with id and name properties or null on failure
     */
    public function getPersonandOrganizationRepos(): ?array
    {
        if (! $this->user?->getAccessToken(self::PROVIDER)) {
            return null;
        }

        $publicRepos = [];
        $privateRepos = [];
        $organizationRepos = [];

        $personalReposData = $this->getRepositories();
        if ($personalReposData) {
            $personalRepos = collect($personalReposData)
                ->filter(fn ($repo) => $repo['permissions']['admin'] ?? false);

            foreach ($personalRepos as $repo) {
                $repoData = [
                    'id' => $repo['id'],
                    'name' => $repo['full_name'],
                ];

                if ($repo['private'] ?? false) {
                    $privateRepos[] = $repoData;
                } else {
                    $publicRepos[] = $repoData;
                }
            }
        }

        $orgs = $this->getOrganizations();
        if ($orgs && count($orgs) > 0) {
            foreach ($orgs as $org) {
                $orgRepos = $this->getOrganizationRepos($org['login']);
                if (! $orgRepos) {
                    continue;
                }

                foreach ($orgRepos as $repo) {
                    if (($repo['permissions']['admin'])) {
                        $organizationRepos[] = [
                            'id' => $repo['id'],
                            'name' => $repo['full_name'],
                        ];
                    }
                }
            }
        }

        return [
            'public' => $publicRepos,
            'private' => $privateRepos,
            'orgs' => $organizationRepos,
        ];
    }
}
