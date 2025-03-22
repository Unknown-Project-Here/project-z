<?php

namespace App\Actions\Project\Invite;

use App\Models\Project;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class GetEligibleUsers
{
    /**
     * Get users that can be invited to the project.
     * Excludes current project members and users with pending invitations.
     *
     * @param  Project  $project  The project to get eligible users for
     * @param  string|null  $search  Optional search term to filter users by username
     * @return Collection<int, array{user_id: int, username: string}>
     *
     * @throws \Exception If fetching users fails
     */
    public function __invoke(Project $project, string $search): LengthAwarePaginator
    {
        try {
            $memberIds = $project->members()->pluck('users.id');

            $invitedUserIds = $project->invitations()
                ->where('expires_at', '>', now())
                ->pluck('invitee_id');

            $query = User::select('id as user_id', 'username', 'avatar')
                ->whereNotIn('id', $memberIds)
                ->whereNotIn('id', $invitedUserIds)
                ->when($search, function ($query, $search) {
                    return $query->where('username', 'like', "%{$search}%");
                });

            $users = $query->paginate(20)->through(function ($user) {
                if (is_null($user->avatar) || $user->avatar === '') {
                    unset($user->avatar);
                }

                return $user;
            });

            return $users;
        } catch (\Exception $e) {
            Log::error('Failed to fetch eligible users:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
