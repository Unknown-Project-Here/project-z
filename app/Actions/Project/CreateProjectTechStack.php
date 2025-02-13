<?php

namespace App\Actions\Project;

use App\Models\Option;
use App\Models\ProjectTechStack;
use Closure;

class CreateProjectTechStack
{
    public function handle($pipeline, Closure $next)
    {
        $project = $pipeline['project'];
        $data = $pipeline['data'];
        $insertData = [];

        foreach (['domain', 'language', 'framework', 'specialization'] as $category) {
            $options = Option::query()
                ->whereHas('category', fn($query) => $query->where('name', $category))
                ->whereIn('name', array_map('strtolower', $data['project']['skills'][$category]))
                ->get();

            foreach ($options as $option) {
                $insertData[] = [
                    'project_id' => $project->id,
                    'option_id' => $option->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }

        if (!empty($insertData)) {
            ProjectTechStack::insert($insertData);
        }

        return $next($pipeline);
    }
}
