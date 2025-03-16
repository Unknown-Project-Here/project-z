<?php

namespace App\Services\Auth;

use App\Models\SocialAccount;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SocialTokenService
{
    public function updateTokenData(SocialAccount $socialAccount, array $tokenData): void
    {
        $socialAccount->update([
            'access_token' => $tokenData['access_token'] ?? $socialAccount->access_token,
            'refresh_token' => $tokenData['refresh_token'] ?? $socialAccount->refresh_token,
            'token_expires_at' => isset($tokenData['expires_in'])
                ? now()->addSeconds($tokenData['expires_in'])
                : $socialAccount->token_expires_at,
        ]);
    }

    public function refreshToken(SocialAccount $socialAccount): array
    {
        if (! $socialAccount->refresh_token) {
            throw new Exception('No refresh token available');
        }

        $provider = $socialAccount->provider;

        try {
            if ($provider === 'google') {
                return $this->refreshGoogleToken($socialAccount->refresh_token);
            } elseif ($provider === 'discord') {
                return $this->refreshDiscordToken($socialAccount->refresh_token);
            } elseif ($provider === 'github') {
                // GitHub tokens don't expire by default
                return ['message' => 'GitHub tokens do not expire'];
            } else {
                throw new Exception('Unsupported provider for token refresh');
            }
        } catch (Exception $e) {
            Log::error('Token refresh failed', [
                'provider' => $provider,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    protected function refreshGoogleToken(string $refreshToken): array
    {
        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'refresh_token' => $refreshToken,
            'grant_type' => 'refresh_token',
        ]);

        return $response->json();
    }

    protected function refreshDiscordToken(string $refreshToken): array
    {
        $response = Http::asForm()->post('https://discord.com/api/oauth2/token', [
            'client_id' => config('services.discord.client_id'),
            'client_secret' => config('services.discord.client_secret'),
            'refresh_token' => $refreshToken,
            'grant_type' => 'refresh_token',
        ]);

        return $response->json();
    }
}
