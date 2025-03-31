<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectIssueAssignee extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'project_issue_id',
        'user_id',
    ];

    public function projectIssue(): BelongsTo
    {
        return $this->belongsTo(ProjectIssue::class);
    }

    public function projectUser(): BelongsTo
    {
        return $this->belongsTo(ProjectUser::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
