<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectApplicationRequestQuestions extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'question',
        'project_id',
        'is_optional',
    ];

    protected $casts = [
        'is_optional' => 'boolean',
    ];

    /**
     * Get the project that owns the question.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the answers for the question.
     */
    public function answers(): HasMany
    {
        return $this->hasMany(ProjectApplicationRequestAnswers::class, 'question_id');
    }
}
