<?php

namespace App\Actions\Project;

use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\User;
use App\Models\ProjectUser;
use Closure;

class AddMembersToProject
{
    public function handle($data, Closure $next)
    {
        // Extract project and users from the data
        $project = $data['project'] ?? null;
        $users = $data['users'] ?? [];
        $role = $data['role'] ?? ProjectRole::CONTRIBUTOR;

        if (!$project instanceof Project || empty($users)) {
            return $next($data);
        }

        // Attach users to project with specified role
        foreach ($users as $user) {
            if ($user instanceof User) {
                ProjectUser::updateOrCreate(
                    [
                        'project_id' => $project->id,
                        'user_id' => $user->id,
                    ],
                    ['role' => $role]
                );
            }
        }

        return $next($data);
    }
}
