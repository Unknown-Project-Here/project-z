<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function create(User $user): Response
    {
        if (is_null($user->email_verified_at)) {
            return Response::deny('You must verify your email to create a project.');
        }

        if ($user->onboarded === false) {
            return Response::deny('You must complete your onboarding to create a project.');
        }

        return Response::allow();
    }

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

    /**
     * Determine if the user can invite a user to the project. Only the creator and admins can invite users to the project.
     */
    public function invite(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::MEMBER_INVITE)
            ? Response::allow()
            : Response::deny('You do not have permission to invite users to this project.');
    }

    public function edit(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::PROJECT_EDIT)
            ? Response::allow()
            : Response::deny('You do not have permission to edit this project.');
    }
}
