<?php

namespace App\Models;

use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'skill_level',
        'provider_name',
        'provider_id',
        'avatar',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'provider_name',
        'provider_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'onboarded' => 'boolean',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class)
            ->using(ProjectUser::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function projectRequests()
    {
        return $this->hasMany(ProjectRequest::class);
    }

    /**
     * Determine if the user has the given permission for the project.
     */
    public function hasPermission(Project $project, ProjectPermission $permission): bool
    {
        $projectUser = $this->projects()
            ->wherePivot('project_id', $project->id)
            ->first();

        return $projectUser?->pivot->hasPermission($permission) ?? false;
    }

    /**
     * Check if the user has a specific role in any project
     */
    public function hasGlobalRole(ProjectRole $role): bool
    {
        return $this->projects()
            ->wherePivot('role', $role->value)
            ->exists();
    }

    /**
     * Check if the user has a specific role in a project
     */
    public function hasRole(Project $project, ProjectRole $role): bool
    {
        return $this->projects()
            ->wherePivot('project_id', $project->id)
            ->wherePivot('role', $role->value)
            ->exists();
    }

    public function techStack()
    {
        return $this->hasMany(UserTechStack::class);
    }
}
