<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Option extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = strtolower($value);
    }

    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }
}
