<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use App\Enums\ProjectPermission;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{

    /**
     * Determine if the user can rename the project. Only the creator can rename the project.
     */
    public function rename(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::PROJECT_RENAME)
            ? Response::allow()
            : Response::deny('You do not have permission to rename this project.');
    }

    /**
     * Determine if the user can delete the project. Only the creator can delete the project.
     */
    public function delete(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::PROJECT_DELETE)
            ? Response::allow()
            : Response::deny('You do not have permission to delete this project.');
    }
}
