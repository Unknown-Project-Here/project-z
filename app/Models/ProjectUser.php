<?php

namespace App\Models;

use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectUser extends Pivot
{
    protected $casts = [
        'role' => ProjectRole::class,
    ];

    public function hasPermission(ProjectPermission $permission): bool
    {
        return $this->role->hasPermission($permission);
    }
}
