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

            // Create new user with passed socialUser
            $newUser = User::create([
                'username' => $this->generateUniqueUsername($socialUser),
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
            $username = substr($baseUsername, 0, 15 - strlen((string)$counter)) . $counter;
            $counter++;
        }
        
        // If we somehow couldn't find a unique username, generate a random one
        if ($counter >= 1000) {
            $username = 'user' . substr(md5(uniqid()), 0, 10);
        }
        
        return $username;
    }
}