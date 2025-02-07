<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use App\Enums\ProjectRole;
use App\Enums\ProjectPermission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectDeleteTest extends TestCase
{
    use RefreshDatabase;

    private Project $project;
    private User $creator;
    private User $admin;
    private User $contributor;

    protected function setUp(): void
    {
        parent::setUp();

        $this->creator = User::factory()->create();
        $this->admin = User::factory()->create();
        $this->contributor = User::factory()->create();

        $this->project = Project::factory()
            ->withMembers([
                ['user' => $this->creator, 'role' => ProjectRole::CREATOR],
                ['user' => $this->admin, 'role' => ProjectRole::ADMIN],
                ['user' => $this->contributor, 'role' => ProjectRole::CONTRIBUTOR],
            ])
            ->create();
    }

    public function test_creator_can_delete_project(): void
    {
        $response = $this->actingAs($this->creator)
            ->deleteJson("/projects/{$this->project->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('projects', ['id' => $this->project->id]);
    }

    public function test_admin_cannot_delete_project(): void
    {
        $response = $this->actingAs($this->admin)
            ->deleteJson("/projects/{$this->project->id}");

        $response->assertForbidden()
            ->assertJson([
                'message' => 'You do not have permission to delete this project.'
            ]);

        $this->assertDatabaseHas('projects', ['id' => $this->project->id]);
    }

    public function test_contributor_cannot_delete_project(): void
    {
        $response = $this->actingAs($this->contributor)
            ->deleteJson("/projects/{$this->project->id}");

        $response->assertForbidden()
            ->assertJson([
                'message' => 'You do not have permission to delete this project.'
            ]);

        $this->assertDatabaseHas('projects', ['id' => $this->project->id]);
    }

    public function test_unauthenticated_user_cannot_delete_project(): void
    {
        $response = $this->deleteJson("/projects/{$this->project->id}");

        $response->assertUnauthorized();
        $this->assertDatabaseHas('projects', ['id' => $this->project->id]);
    }

    public function test_non_member_cannot_delete_project(): void
    {
        $nonMember = User::factory()->create();

        $response = $this->actingAs($nonMember)
            ->deleteJson("/projects/{$this->project->id}");

        $response->assertForbidden()
            ->assertJson([
                'message' => 'You do not have permission to delete this project.'
            ]);

        $this->assertDatabaseHas('projects', ['id' => $this->project->id]);
    }
}
