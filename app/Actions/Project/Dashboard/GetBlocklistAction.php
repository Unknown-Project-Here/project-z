<?php

namespace App\Actions\Project\Dashboard;

use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetBlocklistAction
{
    public function __invoke(Project $project, ?string $search = null): LengthAwarePaginator
    {
        $blacklistedUsers = $project->blacklistedUsers()
            ->with('user')
            ->when($search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('username', 'like', '%' . $search . '%');
                });
            })
            ->paginate(20);

        $blacklistedUsers->withPath(route('projects.show', $project->id).'?activeTab=members&activeSection=blocklist');

        $blacklistedUsers->setCollection(
            $blacklistedUsers->getCollection()->map(function ($blacklist) {
                return [
                    'id' => $blacklist->user->id,
                    'username' => $blacklist->user->username,
                    'avatar' => $blacklist->user->avatar,
                ];
            })
        );

        return $blacklistedUsers;
    }
}
