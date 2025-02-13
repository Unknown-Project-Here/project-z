<?php

namespace App\Actions\Project;

use App\Enums\ProjectRole;
use Closure;

class AssignCreatorRole
{
    public function handle($pipeline, Closure $next)
    {
        $project = $pipeline['project'];
        $user = request()->user();

        $project->members()->attach($user->id, [
            'role' => ProjectRole::CREATOR,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return $next($pipeline);
    }
}
