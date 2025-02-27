<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SocialLoginController extends Controller
{
    public function redirectToProvider(string $provider): RedirectResponse
    {
        if (!in_array($provider, config('auth.socialite.drivers'), true)) {
            abort(404, 'Social Provider is not supported');
        }
 
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider): RedirectResponse
    {
        if (!in_array($provider, config('auth.socialite.drivers'), true)) {
            abort(404, 'Social Provider is not supported');
        }

        try {
            $socialUser = Socialite::driver($provider)->user();
            
            $existingUser = User::where('email', $socialUser->getEmail())->first();

            if ($existingUser) {
                // Update existing user's provider details
                $existingUser->update([
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                ]);
                
                Auth::login($existingUser, true);

                return redirect()->intended(
                    $existingUser->hasVerifiedEmail() 
                        ? route('dashboard') 
                        : route('verification.notice')
                );
            }

            // Create new user
            $newUser = User::create([
                'username' => $this->generateUniqueUsername($socialUser->getName()),
                'provider_name' => $provider,
                'provider_id' => $socialUser->getId(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
            ]);

            event(new Registered($newUser));

            // Auto verify email for trusted providers
            if (in_array($provider, ['google'], true)) {
                $newUser->markEmailAsVerified();
                event(new Verified($newUser));
            }

            Auth::login($newUser, true);
            
            return redirect()->intended(
                $newUser->hasVerifiedEmail() 
                    ? route('dashboard') 
                    : route('verification.notice')
            );

        } catch (Exception $e) {
            Log::error('Social login failed:', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('login')
                ->with('error', 'Unable to authenticate with ' . ucfirst($provider));
        }
    }

    private function generateUniqueUsername(string $name): string
    {
        $baseUsername = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $name));
        $username = $baseUsername;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $baseUsername . $counter;
            $counter++;
        }

        return $username;
    }
}