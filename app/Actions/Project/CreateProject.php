<?php

namespace App\Actions\Project;

use App\Models\Project;
use Closure;

class CreateProject
{
    public function handle($data, Closure $next)
    {
        $user = request()->user();

        $project = Project::create([
            'user_id' => $user->id,
            'title' => $data['project']['title'],
            'description' => $data['project']['description'],
            'contact' => $data['project']['contact'],
            'skill_level' => $data['project']['skills']['expertise'],
            'is_active' => true,
        ]);

        return $next([
            'project' => $project,
            'data' => $data,
        ]);
    }
}
