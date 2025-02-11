<?php

namespace App\Actions\Onboarding;

use Closure;

class MarkUserAsOnboarded
{
    public function handle($data, Closure $next)
    {
        $user = request()->user();
        $user->onboarded = true;
        $user->save();

        return $next($data);
    }
}
