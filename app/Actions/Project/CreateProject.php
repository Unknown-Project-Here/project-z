<?php

namespace App\Actions\Project;

use App\Models\Project;
use Closure;

class CreateProject
{
    public function handle($data, Closure $next)
    {
        $user = request()->user();

        $projectData = array_merge([
            'user_id' => $user->id,
            'title' => $data['project']['title'],
            'description' => $data['project']['description'],
            'contact' => $data['project']['contact'],
            'skill_level' => $data['project']['skills']['expertise'],
            'is_active' => true,
        ], isset($data['project']['repo_id']) ? ['repo_id' => $data['project']['repo_id']] : []);

        $project = Project::create($projectData);

        return $next(compact('project', 'data'));
    }
}
