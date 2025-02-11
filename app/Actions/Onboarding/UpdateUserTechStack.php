<?php

namespace App\Actions\Onboarding;

use App\Models\Option;
use App\Models\UserTechStack;
use Closure;

class UpdateUserTechStack
{
    public function handle($data, Closure $next)
    {
        $user = request()->user();
        $expertise = $data['skills']['expertise'];

        foreach (['domain', 'language', 'framework', 'specialization'] as $category) {
            $options = Option::query()
                ->whereHas('category', fn($query) => $query->where('name', $category))
                ->whereIn('name', array_map('strtolower', $data['skills'][$category]))
                ->get();

            foreach ($options as $option) {
                UserTechStack::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'option_id' => $option->id
                    ],
                    ['skill_level' => $expertise]
                );
            }
        }

        return $next($data);
    }
}
