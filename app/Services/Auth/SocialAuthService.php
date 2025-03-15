<?php

namespace App\Services\Auth;

use App\Models\SocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Contracts\User as SocialiteUser;

class SocialAuthService
{
    protected UsernameGeneratorService $usernameGenerator;

    protected SocialTokenService $tokenService;

    public function __construct(
        UsernameGeneratorService $usernameGenerator,
        SocialTokenService $tokenService
    ) {
        $this->usernameGenerator = $usernameGenerator;
        $this->tokenService = $tokenService;
    }

    protected function getSocialUsername(SocialiteUser $socialUser, string $provider): string
    {
        if (in_array($provider, ['github', 'discord'], true)) {
            return $socialUser->getNickname() ?? $socialUser->getEmail();
        }

        // Default to email for Google and other providers
        return $socialUser->getEmail();
    }

    public function socialAccountExists(string $provider, string $providerId): bool
    {
        return SocialAccount::where('provider', $provider)
            ->where('provider_id', $providerId)
            ->exists();
    }

    public function findSocialAccount(string $provider, string $providerId): ?SocialAccount
    {
        return SocialAccount::where('provider', $provider)
            ->where('provider_id', $providerId)
            ->first();
    }

    public function findUserBySocialProvider(string $provider, string $providerId): ?User
    {
        $socialAccount = $this->findSocialAccount($provider, $providerId);

        if (! $socialAccount) {
            return null;
        }

        return User::find($socialAccount->user_id);
    }

    public function isSocialAccountLinkedToAnotherUser(string $provider, string $providerId, ?int $currentUserId = null): bool
    {
        $query = SocialAccount::where('provider', $provider)
            ->where('provider_id', $providerId);

        if ($currentUserId !== null) {
            $query->where('user_id', '!=', $currentUserId);
        }

        return $query->exists();
    }

    public function handleExistingUser(User $user, SocialiteUser $socialUser, string $provider): void
    {
        $socialAccount = $user->getSocialAccount($provider);
        $providerId = $socialUser->getId();

        // Check if this social account is already linked to another user
        if ($this->isSocialAccountLinkedToAnotherUser($provider, $providerId, $user->id)) {
            throw new AuthorizationException('This social account is already linked to another user');
        }

        $tokenData = [
            'access_token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
            'expires_in' => $socialUser->expiresIn ?? null,
        ];

        $socialUsername = $this->getSocialUsername($socialUser, $provider);

        if ($socialAccount) {
            // Update existing social account tokens and username
            $socialAccount->username = $socialUsername;
            $this->tokenService->updateTokenData($socialAccount, $tokenData);
        } else {
            // Create new social account for existing user
            SocialAccount::create([
                'user_id' => $user->id,
                'provider' => $provider,
                'provider_id' => $providerId,
                'username' => $socialUsername,
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn)
                    ? now()->addSeconds($socialUser->expiresIn)
                    : null,
            ]);
        }
    }

    public function linkSocialAccount(User $user, SocialiteUser $socialUser, string $provider): void
    {
        // Check if user already has this social provider connected
        $socialAccount = $user->getSocialAccount($provider);
        $providerId = $socialUser->getId();

        if ($socialAccount) {
            throw new Exception('This social account is already connected to this user');
        }

        // Check if this social account is already linked to another user
        if ($this->isSocialAccountLinkedToAnotherUser($provider, $providerId)) {
            throw new AuthorizationException('This social account is already linked to another user');
        }

        $socialUsername = $this->getSocialUsername($socialUser, $provider);

        SocialAccount::create([
            'user_id' => $user->id,
            'provider' => $provider,
            'provider_id' => $providerId,
            'username' => $socialUsername,
            'access_token' => $socialUser->token,
            'refresh_token' => $socialUser->refreshToken,
            'token_expires_at' => isset($socialUser->expiresIn)
                ? now()->addSeconds($socialUser->expiresIn)
                : null,
        ]);
    }

    public function createUserFromSocialLogin(SocialiteUser $socialUser, string $provider): User
    {
        try {
            $providerId = $socialUser->getId();

            // Check if this social account is already linked to another user
            if ($this->socialAccountExists($provider, $providerId)) {
                throw new AuthorizationException('This social account is already linked to another user');
            }

            $newUser = User::create([
                'username' => $this->usernameGenerator->generateFromSocialUser($socialUser),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
            ]);

            $socialUsername = $this->getSocialUsername($socialUser, $provider);

            SocialAccount::create([
                'user_id' => $newUser->id,
                'provider' => $provider,
                'provider_id' => $providerId,
                'username' => $socialUsername,
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'token_expires_at' => isset($socialUser->expiresIn)
                    ? now()->addSeconds($socialUser->expiresIn)
                    : null,
            ]);

            event(new Registered($newUser));

            // Auto verify email for trusted providers
            if (in_array($provider, ['google', 'discord', 'github'], true)) {
                $newUser->markEmailAsVerified();
                event(new Verified($newUser));
            }

            return $newUser;
        } catch (Exception $e) {
            Log::error('Failed to create user from social login', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }
}
