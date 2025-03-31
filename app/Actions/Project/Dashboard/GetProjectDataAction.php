<?php

namespace App\Actions\Project\Dashboard;

use App\Models\Project;

class GetProjectDataAction
{
    public function __invoke(Project $project): array
    {
        return $project->load([
            'user',
            'stack.option.category',
            'members',
            'configuration',
        ])->toArray();
    }
}
