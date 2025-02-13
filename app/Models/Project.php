<?php

namespace App\Models;

use App\Enums\ProjectRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Project extends Model
{
    use HasFactory;

    protected $casts = [
        'contact' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_active' => 'boolean',
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
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->using(ProjectUser::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function techStack()
    {
        return $this->hasMany(ProjectTechStack::class);
    }

    public function hasUserWithRole(User $user, ProjectRole $role): bool
    {
        return $this->members()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('role', $role)
            ->exists();
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
}
