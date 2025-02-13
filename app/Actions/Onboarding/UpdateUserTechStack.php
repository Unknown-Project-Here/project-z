<?php

namespace App\Actions\Onboarding;

use App\Models\Option;
use App\Models\UserTechStack;
use Closure;

class UpdateUserTechStack
{
    public function handle($data, Closure $next)
    {
        $userId = request()->user()->id;

        UserTechStack::where('user_id', $userId)->delete();

        $insertData = [];

        foreach (['domain', 'language', 'framework', 'specialization'] as $category) {
            $options = Option::query()
                ->whereHas('category', fn($query) => $query->where('name', $category))
                ->whereIn('name', array_map('strtolower', $data['skills'][$category] ?? []))
                ->get();

            foreach ($options as $option) {
                $insertData[] = [
                    'user_id' => $userId,
                    'option_id' => $option->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }

        if (!empty($insertData)) {
            UserTechStack::insert($insertData);
        }

        return $next($data);
    }
}
