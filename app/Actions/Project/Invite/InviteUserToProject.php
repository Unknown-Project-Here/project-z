<?php

namespace App\Actions\Project\Invite;

use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class InviteUserToProject
{
    /**
     * Invite a user to the project.
     *
     * @param  Project  $project  The project to invite the user to
     * @param  User  $inviter  The user sending the invitation
     * @param  int  $invitee_id  The ID of the user being invited
     * @param  string  $role  The role to assign to the invited user
     * @return array{success: bool, message: string}
     *
     * @throws \Exception If the invitation fails
     */
    public function __invoke(Project $project, User $inviter, int $invitee_id, string $role): array
    {
        try {
            $existingInvitation = $project->invitations()
                ->where('invitee_id', $invitee_id)
                ->where('expires_at', '>', now())
                ->first();

            if ($existingInvitation) {
                return [
                    'success' => false,
                    'message' => 'An active invitation already exists for this user.',
                ];
            }

            if ($project->members()->where('user_id', $invitee_id)->exists()) {
                return [
                    'success' => false,
                    'message' => 'User is already a member of this project.',
                ];
            }

            $project->invitations()->create([
                'inviter_id' => $inviter->id,
                'invitee_id' => $invitee_id,
                'role' => $role,
            ]);

            return [
                'success' => true,
                'message' => 'Invitation sent successfully.',
            ];
        } catch (\Exception $e) {
            Log::error('Project invitation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
