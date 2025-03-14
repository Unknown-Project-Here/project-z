<?php

namespace App\Services\GitHub;

use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class GitHubApiService
{
    protected Client $client;
    protected ?string $accessToken;
    protected ?string $username;
    protected const BASE_URL = 'https://api.github.com';

    public function __construct(?string $accessToken = null)
    {
        $this->accessToken = $accessToken;
        $this->client = new Client([
            'base_uri' => self::BASE_URL,
            'headers' => [
                'Accept' => 'application/vnd.github.v3+json',
                'Content-Type' => 'application/json',
                'User-Agent' => 'Laravel-GitHub-App',
            ],
        ]);
    }

    public function setAccessToken(string $accessToken): self
    {
        $this->accessToken = $accessToken;
        return $this;
    }

    public function setAccessTokenFromUser(User $user): self
    {
        $socialAccount = $user->getSocialAccount('github');

        if (!$socialAccount || !$socialAccount->access_token) {
            throw new Exception('User does not have a GitHub account connected');
        }

        $this->accessToken = $socialAccount->access_token;
        $this->username = $socialAccount->username ?? null;
        return $this;
    }

    public function getAuthenticatedUser(): array
    {
        return $this->request('GET', '/user');
    }

    public function getRepositories(): array
    {
        return $this->request('GET', '/user/repos');
    }

    public function getOrganizations(): array
    {
        return $this->request('GET', '/user/orgs');
    }

    /**
     * Make an API request to GitHub
     *
     * @param string $method HTTP method (GET, POST, etc)
     * @param string $endpoint API endpoint
     * @param array $params Request parameters
     * @param array $customHeaders Custom headers to add to the request
     * @return array Response data
     * @throws GuzzleException|Exception
     */
    protected function request(string $method, string $endpoint, array $params = [], array $customHeaders = []): array
    {
        if (!$this->accessToken) {
            throw new Exception('GitHub API access token not provided');
        }

        $options = [
            'headers' => [
                'Authorization' => "Bearer {$this->accessToken}",
            ],
        ];

        if (!empty($customHeaders)) {
            $options['headers'] = array_merge($options['headers'], $customHeaders);
        }

        if (!empty($params)) {
            if (strtoupper($method) === 'GET') {
                $options['query'] = $params;
            } else {
                $options['json'] = $params;
            }
        }

        try {
            $response = $this->client->request($method, $endpoint, $options);
            return json_decode($response->getBody()->getContents(), true) ?? [];
        } catch (GuzzleException $e) {
            Log::error('GitHub API error', [
                'method' => $method,
                'endpoint' => $endpoint,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}
