<?php

namespace App\Models;

use App\Enums\SkillLevelEnum;
use Illuminate\Database\Eloquent\Model;

class ProjectTechStack extends Model
{
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'skill_level' => SkillLevelEnum::class,
    ];

    protected $fillable = [
        'project_id',
        'option_id',
        'skill_level',
        'created_at',
        'updated_at',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}
