<?php

namespace App\Actions\Onboarding;

use Closure;

class UpdateUserSkillLevel
{
    public function handle($data, Closure $next)
    {
        $user = request()->user();
        $user->skill_level = $data['skills']['expertise'];
        $user->save();

        return $next($data);
    }
}
