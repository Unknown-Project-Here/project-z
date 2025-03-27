<?php

namespace App\Policies;

use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\User;
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

    public function request(User $user, Project $project): Response
    {
        if ($user->onboarded === false) {
            return Response::deny('You must complete your onboarding to request to join a project.');
        }

        if ($user->projects()->where('project_id', $project->id)->exists()) {
            return Response::deny('You are already a member of this project.');
        }

        if ($user->projectRequests()->where('project_id', $project->id)->exists()) {
            return Response::deny('You have already requested to join this project.');
        }

        if (! $project->configuration->is_requestable) {
            return Response::deny('This project is not accepting requests.');
        }

        return Response::allow();
    }

    public function manageRequests(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::MEMBER_MANAGE_REQUESTS)
            ? Response::allow()
            : Response::deny('You do not have permission to accept requests for this project.');
    }

    public function removeMember(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::MEMBER_REMOVE)
            ? Response::allow()
            : Response::deny('You do not have permission to remove members from this project.');
    }

    public function updateMemberRole(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::MEMBER_UPDATE_ROLE)
            ? Response::allow()
            : Response::deny('You do not have permission to update roles for this project.');
    }

    public function updateToCreator(User $user, Project $project): Response
    {
        return $user->hasPermission($project, ProjectPermission::MEMBER_UPDATE_TO_CREATOR)
            ? Response::allow()
            : Response::deny('You do not have permission to update roles for this project.');
    }
}
