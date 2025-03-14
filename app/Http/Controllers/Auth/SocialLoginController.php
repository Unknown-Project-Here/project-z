<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirectToProvider(string $provider): RedirectResponse
    {
        if (! in_array($provider, config('auth.socialite.drivers'), true)) {
            abort(404, 'Social Provider is not supported');
        }
        if ($provider === 'google') {
            return Socialite::driver($provider)
                ->with([
                    'access_type' => 'offline',
                    'prompt' => 'consent select_account',
                ])
                ->redirect();
        }

        if ($provider === "github") {
            return Socialite::driver($provider)
                ->scopes(['read:user', 'public_repo', 'read:org', 'read:project'])
                ->redirect();
        }

        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider): RedirectResponse
    {
        if (! in_array($provider, config('auth.socialite.drivers'), true)) {
            abort(404, 'Social Provider is not supported');
        }

        try {
            $socialUser = Socialite::driver($provider)->user();

            if (! $socialUser->getEmail()) {
                throw new Exception('Email address is required');
            }

            // Find user by email
            $existingUser = User::where('email', $socialUser->getEmail())->first();

            if ($existingUser) {
                return $this->handleExistingUser($existingUser, $socialUser, $provider);
            }

            return $this->handleNewUser($socialUser, $provider);

        } catch (Exception $e) {
            Log::error('Social login failed:', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('login')
                ->with('error', 'Unable to authenticate with '.ucfirst($provider));
        }
    }

    protected function handleExistingUser(User $user, $socialUser, string $provider): RedirectResponse
    {
        $socialAccount = $user->getSocialAccount($provider);

        $tokenData = [
            'access_token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
            'token_expires_at' => isset($socialUser->expiresIn)
                ? now()->addSeconds($socialUser->expiresIn)
                : null,
        ];

        if ($socialAccount) {
            // Update existing social account tokens
            $socialAccount->update($tokenData);
        } else {
            // Create new social account for existing user
            SocialAccount::create([
                'user_id' => $user->id,
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn)
                    ? now()->addSeconds($socialUser->expiresIn)
                    : null,
            ]);
        }

        Auth::login($user, true);

        return redirect()->intended(
            $user->hasVerifiedEmail()
                ? route('dashboard')
                : route('verification.notice')
        );
    }

    private function handleNewUser($socialUser, string $provider): RedirectResponse
    {
        // Create new user
        $newUser = User::create([
            'username' => $this->generateUniqueUsername($socialUser),
            'email' => $socialUser->getEmail(),
            'avatar' => $socialUser->getAvatar(),
        ]);

        // Create social account record
        SocialAccount::create([
            'user_id' => $newUser->id,
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
            'access_token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
            'token_expires_at' => isset($socialUser->expiresIn) ? now()->addSeconds($socialUser->expiresIn) : null,
        ]);

        event(new Registered($newUser));

        // Auto verify email for trusted providers
        if (in_array($provider, ['google', 'discord', 'github'], true)) {
            $newUser->markEmailAsVerified();
            event(new Verified($newUser));
        }

        Auth::login($newUser, true);

        return redirect()->intended(
            $newUser->hasVerifiedEmail()
                ? route('dashboard')
                : route('verification.notice')
        );
    }

    /**
     * Refresh the access token for a specific provider
     */
    public function refreshToken(string $provider)
    {
        $user = Auth::user();

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        try {
            $socialUser = Socialite::driver($provider)->user();

            // Find user by email
            $existingUser = User::where('email', $socialUser->getEmail())
                ->first();

            if ($existingUser) {
                // Check if user already has this social provider connected
                $socialAccount = $existingUser->getSocialAccount($provider);

                if (! $socialAccount || ! $socialAccount->refresh_token) {
                    return response()->json(['error' => 'No refresh token available'], 400);
                }

                // Different providers have different refresh methods
                if ($provider === 'google') {
                    $newToken = $this->refreshGoogleToken($socialAccount->refresh_token);
                } elseif ($provider === 'discord') {
                    $newToken = $this->refreshDiscordToken($socialAccount->refresh_token);
                } elseif ($provider === 'github') {
                    // GitHub tokens don't expire by default
                    return response()->json(['message' => 'GitHub tokens do not expire']);
                } else {
                    return response()->json(['error' => 'Unsupported provider for token refresh'], 400);
                }

                $socialAccount->update([
                    'access_token' => $newToken['access_token'],
                    'token_expires_at' => now()->addSeconds($newToken['expires_in'] ?? 3600),
                ]);

                return response()->json(['message' => 'Token refreshed successfully']);
            }
        } catch (Exception $e) {
            Log::error('Token refresh failed', [
                'provider' => $provider,
                'error' => $e->getMessage(),
            ]);

            return response()->json(['error' => 'Failed to refresh token'], 500);
        }
    }

    /**
     * Refresh Google access token
     */
    protected function refreshGoogleToken(string $refreshToken)
    {
        $client = new \GuzzleHttp\Client;
        $response = $client->post('https://oauth2.googleapis.com/token', [
            'form_params' => [
                'client_id' => config('services.google.client_id'),
                'client_secret' => config('services.google.client_secret'),
                'refresh_token' => $refreshToken,
                'grant_type' => 'refresh_token',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    /**
     * Refresh Discord access token
     */
    protected function refreshDiscordToken(string $refreshToken)
    {
        $client = new \GuzzleHttp\Client;
        $response = $client->post('https://discord.com/api/oauth2/token', [
            'form_params' => [
                'client_id' => config('services.discord.client_id'),
                'client_secret' => config('services.discord.client_secret'),
                'refresh_token' => $refreshToken,
                'grant_type' => 'refresh_token',
            ],
        ]);

        return json_decode($response->getBody(), true);
    }

    private function generateUniqueUsername($socialUser): string
    {
        // Get potential username sources
        $nickname = $socialUser->getNickname();
        $name = $socialUser->getName();
        $email = $socialUser->getEmail();

        // Try sources in order of preference
        $baseUsername = $nickname ?? $name ?? explode('@', $email)[0] ?? 'user';

        $baseUsername = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $baseUsername));

        if (strlen($baseUsername) < 3) {
            $baseUsername .= substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, 3);
        }

        $baseUsername = substr($baseUsername, 0, 15);

        $username = $baseUsername;
        $counter = 1;

        // Try up to 999 times to find a unique username
        while ($counter < 1000 && User::where('username', $username)->exists()) {
            $username = substr($baseUsername, 0, 15 - strlen((string) $counter)).$counter;
            $counter++;
        }

        // If we somehow couldn't find a unique username, generate a random one
        if ($counter >= 1000) {
            $username = 'user'.substr(md5(uniqid()), 0, 10);
        }

        return $username;
    }
}
