<?php

namespace Database\Seeders;

use App\Enums\ProjectRole;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);

        // Create 20 users
        $users = User::factory(20)->create();

        // Create 10 projects with creators and random members
        $users->random(10)->each(function ($creator) use ($users) {
            // Get 2-5 random users as members (excluding creator)
            $members = $users->except($creator->id)
                ->random(rand(2, 5))
                ->map(function ($user) {
                    return [
                        'user' => $user,
                        'role' => fake()->randomElement([
                            ProjectRole::ADMIN,
                            ProjectRole::CONTRIBUTOR,
                        ]),
                    ];
                })
                ->toArray();

            Project::factory()
                ->withMembers(array_merge(
                    [['user' => $creator, 'role' => ProjectRole::CREATOR]],
                    $members
                ))
                ->create();
        });
    }
}
