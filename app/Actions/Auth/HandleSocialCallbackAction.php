<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Services\Auth\SocialAuthService;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;

class HandleSocialCallbackAction
{
    protected SocialAuthService $socialAuthService;

    public function __construct(SocialAuthService $socialAuthService)
    {
        $this->socialAuthService = $socialAuthService;
    }

    /**
     * Flow:
     * 1. If user is logged out:
     *    a. Try to log in based on existing social provider_id
     *    b. If provider_id doesn't exist, check if email matches an existing user
     *    c. If email doesn't match, create a new user
     * 2. If user is logged in:
     *    a. Check if provider_id already exists in SocialAccount
     *    b. If not, link the account to the logged-in user
     */
    public function execute(string $provider): RedirectResponse
    {
        if (! in_array($provider, config('auth.socialite.drivers'), true)) {
            abort(404, 'Social Provider is not supported');
        }

        try {
            $socialUser = Socialite::driver($provider)->user();

            if (! $socialUser->getEmail()) {
                throw new Exception('Email address is required');
            }

            $providerId = $socialUser->getId();

            if (Auth::check()) {
                if ($this->socialAuthService->socialAccountExists($provider, $providerId)) {
                    throw new AuthorizationException('This social account is already linked to another user');
                }

                return $this->handleAuthenticatedUser(Auth::user(), $socialUser, $provider);
            } else {

                // 1. Try to log in based on existing provider_id
                $linkedUser = $this->socialAuthService->findUserBySocialProvider($provider, $providerId);

                if ($linkedUser) {
                    return $this->handleExistingSocialUser($linkedUser, $socialUser, $provider);
                }

                // 2. Check if email matches an existing user
                $existingUser = User::where('email', $socialUser->getEmail())->first();

                if ($existingUser) {
                    return $this->handleExistingUser($existingUser, $socialUser, $provider);
                }

                // 3. Create a new user
                return $this->handleNewUser($socialUser, $provider);
            }
        } catch (AuthorizationException $e) {
            if (Auth::check()) {
                return $this->redirectWithCloseScript(route('settings.edit'), [
                    'error' => 'Unauthorized social login attempt'
                ]);
            }

            return $this->redirectWithCloseScript(route('login'), [
                'error' => $e->getMessage() ?: 'Unauthorized social login attempt'
            ]);
        } catch (Exception $e) {
            Log::error('Social login failed:', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return $this->redirectWithCloseScript(route('login'), [
                'error' => 'Unable to authenticate with '.ucfirst($provider)
            ]);
        }
    }

    protected function handleExistingSocialUser(User $user, SocialiteUser $socialUser, string $provider): RedirectResponse
    {
        if (! $user) {
            Log::error('Social account exists but linked user not found', [
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ]);

            return $this->redirectWithCloseScript(route('login'), [
                'error' => 'Account error. Please contact support.'
            ]);
        }

        $this->socialAuthService->handleExistingUser($user, $socialUser, $provider);

        Auth::login($user, true);

        $redirectRoute = $user->hasVerifiedEmail() && ! $user->onboarded
            ? route('profile.onboarding')
            : route('verification.notice');

        return $this->redirectWithCloseScript($redirectRoute, [
            'success' => 'Successfully authenticated with ' . ucfirst($provider)
        ]);
    }

    // Handle linking a social account for an authenticated user
    protected function handleAuthenticatedUser(User $user, $socialUser, string $provider): RedirectResponse
    {
        try {
            $this->socialAuthService->linkSocialAccount($user, $socialUser, $provider);

            return $this->redirectWithCloseScript(route('settings.edit'), [
                'success' => 'Social account connected successfully'
            ]);
        } catch (AuthorizationException $e) {
            return $this->redirectWithCloseScript(route('settings.edit'), [
                'error' => $e->getMessage() ?: 'This social account is already linked to another user'
            ]);
        } catch (Exception $e) {
            return $this->redirectWithCloseScript(route('settings.edit'), [
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Handle existing user login via social provider
     * This is for when a user with the same email exists but hasn't linked this social account yet
     */
    protected function handleExistingUser(User $user, $socialUser, string $provider): RedirectResponse
    {
        try {
            // Add the social provider for the existing user
            $this->socialAuthService->handleExistingUser($user, $socialUser, $provider);

            Auth::login($user, true);

            $redirectRoute = $user->hasVerifiedEmail() && ! $user->onboarded
                ? route('profile.onboarding')
                : route('verification.notice');

            return $this->redirectWithCloseScript($redirectRoute, [
                'success' => 'Successfully authenticated with ' . ucfirst($provider)
            ]);
        } catch (AuthorizationException $e) {
            return $this->redirectWithCloseScript(route('login'), [
                'error' => $e->getMessage() ?: 'This social account is already linked to another user'
            ]);
        }
    }

    protected function handleNewUser($socialUser, string $provider): RedirectResponse
    {
        try {
            $newUser = $this->socialAuthService->createUserFromSocialLogin($socialUser, $provider);

            Auth::login($newUser, true);

            $redirectRoute = $newUser->hasVerifiedEmail()
                ? route('profile.onboarding')
                : route('verification.notice');

            return $this->redirectWithCloseScript($redirectRoute, [
                'success' => 'Account created successfully'
            ]);
        } catch (AuthorizationException $e) {
            return $this->redirectWithCloseScript(route('login'), [
                'error' => $e->getMessage() ?: 'This social account is already linked to another user'
            ]);
        }
    }

    /**
     * Create a response that includes JavaScript to communicate with the opener and close itself
     */
    protected function redirectWithCloseScript(string $parentRedirectUrl, array $flashData = []): RedirectResponse
    {
        // Set any flash messages
        foreach ($flashData as $key => $value) {
            session()->flash($key, $value);
        }
        
        // Set a flag to indicate this should trigger the popup close behavior
        session()->flash('closePopup', true);
        
        // For Inertia, we need to return to the redirect URL
        return redirect()->to($parentRedirectUrl);
    }
}