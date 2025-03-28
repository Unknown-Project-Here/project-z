<?php

namespace App\Models;

use App\Enums\ProjectUserBlacklistEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectUserBlacklist extends Model
{
    protected $fillable = [
        'project_id',
        'user_id',
        'reason',
    ];

    protected $casts = [
        'reason' => ProjectUserBlacklistEnum::class,
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
