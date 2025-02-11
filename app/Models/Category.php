<?php

namespace App\Models;

use App\Enums\CategoryEnum;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['*'];

    protected $casts = [
        'name' => CategoryEnum::class,
    ];

    public $timestamps = false;

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
