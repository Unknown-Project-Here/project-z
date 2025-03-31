<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectApplicationRequestAnswers extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'answer',
        'user_id',
        'question_id',
        'project_id',
    ];

    /**
     * Get the user who submitted the answer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the question this answer belongs to.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(ProjectApplicationRequestQuestions::class, 'question_id');
    }

    /**
     * Get the project this answer belongs to.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
