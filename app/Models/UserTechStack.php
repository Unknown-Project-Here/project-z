<?php

namespace App\Models;

use App\Enums\SkillLevelEnum;
use Illuminate\Database\Eloquent\Model;

class UserTechStack extends Model
{
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'skill_level' => SkillLevelEnum::class,
    ];

    protected $fillable = [
        'user_id',
        'option_id',
        'skill_level',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}
