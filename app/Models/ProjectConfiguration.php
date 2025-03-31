<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectConfiguration extends Model
{
    protected $fillable = [
        'project_id',
        'is_questions_configured',
        'is_requestable',
        'request_configured_at',
    ];

    protected $casts = [
        'is_questions_configured' => 'boolean',
        'is_requestable' => 'boolean',
        'request_configured_at' => 'datetime',
    ];

    public $timestamps = false;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function isRequestStepConfigured(): bool
    {
        return ! is_null($this->request_configured_at);
    }

    public function isQuestionsStepConfigured(): bool
    {
        return $this->is_questions_configured;
    }
}
