<?php

namespace App\Actions\Project\Dashboard;

use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetProjectMembersAction
{
    public function __invoke(Project $project): LengthAwarePaginator
    {
        $members = $project->members()
            ->select('users.id', 'users.username', 'users.avatar', 'project_user.role')
            ->orderByRaw("CASE project_user.role
                WHEN 'creator' THEN 0
                WHEN 'admin' THEN 1
                WHEN 'contributor' THEN 2
                ELSE 3 END")
            ->paginate(10);

        $members->withPath(route('projects.show', $project->id) . '?activeTab=members');

        $members->setCollection(
            $members->getCollection()->map(function ($member) {
                return [
                    'id' => $member->id,
                    'username' => $member->username,
                    'avatar' => $member->avatar,
                    'role' => $member->pivot->role,
                ];
            })
        );

        return $members;
    }
}
