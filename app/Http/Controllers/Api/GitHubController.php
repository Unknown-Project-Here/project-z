<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GitHub\GitHubApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GitHubController extends Controller
{
    protected GitHubApiService $githubApiService;

    public function __construct(GitHubApiService $githubApiService)
    {
        $this->githubApiService = $githubApiService;
    }

    public function getProfile(): JsonResponse
    {
        $this->authenticateUser();
        $profile = $this->githubApiService->getAuthenticatedUser();

        return response()->json([
            'success' => true,
            'data' => $profile,
        ]);
    }

    public function getRepositories(): JsonResponse
    {
        $this->authenticateUser();
        $repositories = $this->githubApiService->getRepositories();

        return response()->json([
            'success' => true,
            'data' => $repositories,
        ]);
    }

    public function getOrganizations(): JsonResponse
    {
        $this->authenticateUser();
        $organizations = $this->githubApiService->getOrganizations();

        return response()->json([
            'success' => true,
            'data' => $organizations,
        ]);
    }

    private function authenticateUser(): void
    {
        $user = Auth::user();

        if (is_null($user)) {
            throw new \Exception('User is not authenticated.', 401);
        }

        $this->githubApiService->setAccessTokenFromUser($user);
    }
}
