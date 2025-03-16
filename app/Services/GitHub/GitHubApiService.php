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

    public function hasSocialProvider(): bool
    {
        return $this->user?->hasSocialProvider(self::PROVIDER) ?? false;
    }

    public function getUserId(): ?int
    {
        return $this->user?->id;
    }

    public function getUser(): ?array
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
                ->get('/user');

            $response->throw();

            return $response->json();
        } catch (RequestException $e) {
            logger()->error('GitHub API request failed: '.$e->getMessage());
            throw $e;
        }
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
                ->get('/user/organizations');

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
}
