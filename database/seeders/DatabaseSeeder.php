<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
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

        // Create 20 users and get the collection
        $users = User::factory(20)->create();

        // Randomly select 10 users and create one project for each
        $users->random(10)->each(function ($user) {
            Project::factory()->create([
                'user_id' => $user->id
            ]);
        });
    }
}
