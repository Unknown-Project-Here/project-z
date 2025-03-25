<?php

namespace App\Actions\Project\Dashboard;

use App\Models\Project;

class GetApplicationsAction
{
    public function __invoke(Project $project, int $userId): array
    {
        return [
            'project' => $project,
            'applications' => $project->applications()
                ->with(['user' => function ($query) {
                    $query->select('id', 'username', 'avatar');
                }])
                ->paginate(10),
        ];
    }
}
