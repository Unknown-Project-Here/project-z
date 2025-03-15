<?php

namespace App\Actions\Auth;

use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class RedirectToSocialProviderAction
{
    public function execute(string $provider): RedirectResponse
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

        if ($provider === 'github') {
            return Socialite::driver($provider)
                ->scopes(['read:user', 'public_repo', 'read:org', 'read:project'])
                ->with(['prompt' => 'consent'])
                ->redirect();
        }

        return Socialite::driver($provider)->redirect();
    }
}
