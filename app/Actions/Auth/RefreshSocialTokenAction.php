<?php

namespace App\Actions\Auth;

use App\Services\Auth\SocialTokenService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RefreshSocialTokenAction
{
    protected SocialTokenService $tokenService;

    public function __construct(SocialTokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }

    public function execute(string $provider): JsonResponse
    {
        $user = Auth::user();

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        try {
            $socialAccount = $user->getSocialAccount($provider);

            if (! $socialAccount || ! $socialAccount->refresh_token) {
                return response()->json(['error' => 'No refresh token available'], 400);
            }

            if ($provider === 'github') {
                // GitHub tokens don't expire by default
            }

            $newToken = $this->tokenService->refreshToken($socialAccount);

            $this->tokenService->updateTokenData($socialAccount, $newToken);

            return response()->json(['message' => 'Token refreshed successfully']);

        } catch (Exception $e) {
            Log::error('Token refresh failed', [
                'provider' => $provider,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Failed to refresh token: '.$e->getMessage()], 500);
        }
    }
}
