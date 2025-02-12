<?php

namespace App\Actions\Project;

use App\Models\Option;
use App\Models\ProjectTechStack;
use Closure;

class UpdateProjectTechStack
{
    public function handle($data, Closure $next)
    {
        $project = request()->project();
            $expertise = $data['skills']['expertise'];

        foreach (['domain', 'language', 'framework', 'specialization'] as $category) {
            $options = Option::query()
                ->whereHas('category', fn($query) => $query->where('name', $category))
                ->whereIn('name', array_map('strtolower', $data['skills'][$category]))
                ->get();

            foreach ($options as $option) {
                ProjectTechStack::updateOrCreate(
                    [
                        'project_id' => $project->id,
                        'option_id' => $option->id
                    ],
                    ['skill_level' => $expertise]
                );
            }
        }

        return $next($data);
    }
}
