<?php

namespace Database\Seeders;

use App\Enums\SkillLevelEnum;
use App\Models\Option;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create up to 100 users with varying states
        User::factory()
            ->count(100)
            ->sequence(fn ($sequence) => [
                'email_verified_at' => $sequence->index % 3 === 0 ? null : now(), // 1/3 unverified
                'onboarded' => $sequence->index % 4 === 0, // 1/4 onboarded
            ])
            ->afterCreating(function (User $user) {
                // Get all available tech stack options
                $options = Option::all();

                // Randomly select between 0 and 5 tech stack options for each user
                $selectedOptions = $options->random(rand(0, 5));

                foreach ($selectedOptions as $option) {
                    // 30% chance of having no skill level specified
                    $skillLevel = rand(1, 10) <= 3 ? null : $this->getRandomSkillLevel();

                    $user->techStack()->create([
                        'option_id' => $option->id,
                        'skill_level' => $skillLevel,
                    ]);
                }
            })
            ->create();
    }

    /**
     * Get a random skill level from the SkillLevelEnum
     */
    private function getRandomSkillLevel(): SkillLevelEnum
    {
        $skillLevels = [
            SkillLevelEnum::BEGINNER,
            SkillLevelEnum::INTERMEDIATE,
            SkillLevelEnum::ADVANCED,
            SkillLevelEnum::EXPERT,
        ];

        return $skillLevels[array_rand($skillLevels)];
    }
}
