<?php

namespace App\Actions\Project\Dashboard;

use App\Models\Project;

class GetApplicationAction
{
    public function __invoke(Project $project, int $applicationId, int $userId): array
    {
        return [
            'project' => $project,
            'application' => $project->applications()
                ->with(['user' => function ($query) {
                    $query->select('id', 'username', 'avatar');
                }])
                ->where('id', $applicationId)
                ->firstOrFail(),
        ];
    }
}
