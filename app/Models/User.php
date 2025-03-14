<?php

namespace App\Models;

use App\Enums\ProjectPermission;
use App\Enums\ProjectRole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    /**
     * Get the social accounts for the user
     */
    public function socialAccounts(): HasMany
    {
        return $this->hasMany(SocialAccount::class);
    }

    /**
     * Get a specific social account by provider name
     *
     * @param  array<string>  $with  Additional relations to eager load
     */
    public function getSocialAccount(string $provider, array $with = []): ?SocialAccount
    {
        $query = $this->socialAccounts()->where('provider', $provider);

        if (! empty($with)) {
            $query->with($with);
        }

        return $query->first();
    }

    /**
     * Check if user has connected a specific social provider
     */
    public function hasSocialProvider(string $provider): bool
    {
        return $this->socialAccounts()
            ->where('provider', $provider)
            ->exists();
    }

    /**
     * Get access token for a specific provider
     */
    public function getAccessToken(string $provider): ?string
    {
        $account = $this->getSocialAccount($provider);

        if (! $account) {
            return null;
        }

        if ($account->isTokenExpired()) {
            // TODO: Handle expired token - refresh it here
            // or handle this in your controller
            return null;
        }

        return $account->access_token;
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
