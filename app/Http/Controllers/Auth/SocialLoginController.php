<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\HandleSocialCallbackAction;
use App\Actions\Auth\RedirectToSocialProviderAction;
use App\Actions\Auth\RefreshSocialTokenAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class SocialLoginController extends Controller
{
    public function redirectToProvider(string $provider, RedirectToSocialProviderAction $action): RedirectResponse
    {
        return $action->execute($provider);
    }

    public function handleProviderCallback(string $provider, HandleSocialCallbackAction $action): RedirectResponse
    {
        return $action->execute($provider);
    }

    public function refreshToken(string $provider, RefreshSocialTokenAction $action): JsonResponse
    {
        return $action->execute($provider);
    }
}
