<?php

namespace App\Models;

use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\DB;

class ProjectUser extends Pivot
{
    protected $casts = [
        'role' => ProjectRole::class,
    ];

    public function hasPermission(ProjectPermission $permission): bool
    {
        return $this->role->hasPermission($permission);
    }

    public static function isUserBlacklisted($projectId, $userId): bool
    {
        return DB::table('project_user_blacklists')
            ->where('project_id', $projectId)
            ->where('user_id', $userId)
            ->exists();
    }
}
