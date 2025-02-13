<?php

namespace App\Actions\Onboarding;

use App\Models\Option;
use App\Models\Category;
use Closure;

class CreateMissingOptions
{
    public function handle($data, Closure $next)
    {
        foreach (['domain', 'language', 'framework', 'specialization'] as $categoryName) {
            if ($category = Category::where('name', $categoryName)->first()) {
                collect($data['skills'][$categoryName])->each(
                    fn($optionName) =>
                    Option::firstOrCreate([
                        'name' => strtolower($optionName),
                        'category_id' => $category->id
                    ])
                );
            }
        }

        return $next($data);
    }
}
