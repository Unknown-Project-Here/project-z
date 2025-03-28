<?php

namespace App\Models;

use App\Enums\ProjectRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory;

    protected $casts = [
        'contact' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_active' => 'boolean',
        'is_requestable' => 'boolean',
        'is_questions_configured' => 'boolean',
        'issue_count' => 'integer',
    ];

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'contact',
        'is_active',
        'created_at',
        'updated_at',
        'skill_level',
        'repo_id',
        'is_requestable',
        'is_questions_configured',
        'issue_count',
    ];

    protected $hidden = [
        'is_requestable',
    ];

    // Relationships

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->using(ProjectUser::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function blacklistedUsers(): HasMany
    {
        return $this->hasMany(ProjectUserBlacklist::class);
    }

    public function configuration(): HasOne
    {
        return $this->hasOne(ProjectConfiguration::class);
    }

    public function stack()
    {
        return $this->hasMany(ProjectTechStack::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function creator(): Attribute
    {
        return Attribute::make(
            get: function () {
                $creator = $this->members()
                    ->wherePivot('role', ProjectRole::CREATOR)
                    ->first();

                return $creator ? [
                    'username' => $creator->username,
                    'created_at' => $creator->created_at,
                ] : null;
            }
        );
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(ProjectInvitation::class);
    }

    public function hasUserWithRole(User $user, ProjectRole $role): bool
    {
        return $this->members()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('role', $role)
            ->exists();
    }

    public function applicationQuestions()
    {
        return $this->hasMany(ProjectApplicationRequestQuestions::class);
    }

    public function applications()
    {
        return $this->hasMany(ProjectRequest::class);
    }

    public function issues(): HasMany
    {
        return $this->hasMany(ProjectIssue::class);
    }

    // Accessors & Mutators
    protected function title(): Attribute
    {
        return new Attribute(
            function ($value) {
                return ucwords($value);
            }
        );
    }

    protected function description(): Attribute
    {
        return new Attribute(
            function ($value) {
                return ucfirst($value);
            }
        );
    }

    // Scopes
    public function scopeActive($query): mixed
    {
        return $query->where('is_active', true);
    }

    public function getIsRequestableAttribute(): bool
    {
        return $this->configuration->is_requestable;
    }
}
