<?php

namespace App\Models;

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
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // protected $with = ['user'];

    // Accessors & Mutators
    protected function title(): Attribute
    {
        return new Attribute(
            function ($value) {
                return ucfirst($value);
            },
            function ($value) {
                return strtolower($value);
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
