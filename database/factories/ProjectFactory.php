<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $techStacks = [
            ['React', 'TypeScript', 'Tailwind'],
            ['Vue', 'JavaScript', 'SCSS'],
            ['Next.js', 'TypeScript', 'Prisma'],
            ['Laravel', 'PHP', 'MySQL'],
            ['Node.js', 'Express', 'MongoDB'],
        ];

        return [
            'user_id' => User::factory(),
            'title' => fake()->catchPhrase(),
            'description' => fake()->paragraph(3),
            'stack' => fake()->randomElement($techStacks),
            'email' => fake()->safeEmail(),
            'discord' => fake()->userName() . '#' . fake()->numberBetween(1000, 9999),
            'github' => 'https://github.com/' . fake()->userName(),
            'website' => fake()->url(),
            'is_active' => fake()->boolean(80), // 80% chance of being active
        ];
    }

    /**
     * Configure the model factory to add project members with roles.
     */
    public function withMembers(array $members = []): static
    {
        return $this->afterCreating(function (Project $project) use ($members) {
            foreach ($members as $member) {
                $project->members()->attach($member['user'], [
                    'role' => $member['role']
                ]);
            }
        });
    }

    /**
     * Indicate that the project is active.
     */
    public function active(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the project is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_active' => false,
        ]);
    }
}
