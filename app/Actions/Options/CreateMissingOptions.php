<?php

namespace App\Actions\Options;

use App\Models\Category;
use App\Models\Option;
use Closure;

class CreateMissingOptions
{
    public function handle($data, Closure $next)
    {
        foreach (['domain', 'language', 'framework', 'specialization'] as $categoryName) {
            if ($category = Category::where('name', $categoryName)->first()) {
                collect($data['skills'][$categoryName])->each(
                    fn ($optionName) => Option::firstOrCreate([
                        'name' => strtolower($optionName),
                        'category_id' => $category->id,
                    ])
                );
            }
        }

        return $next($data);
    }
}
