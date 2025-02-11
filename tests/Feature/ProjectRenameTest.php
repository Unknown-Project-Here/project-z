<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use App\Enums\ProjectRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectRenameTest extends TestCase
{
    use RefreshDatabase;

    private Project $project;
    private User $creator;
    private User $admin;
    private User $contributor;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a project with different role users
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

    public function test_creator_can_rename_project(): void
    {
        $newTitle = 'Updated Project Title';

        $response = $this->actingAs($this->creator)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => $newTitle
            ]);

        $response->assertSuccessful()
            ->assertJson([
                'success' => true,
                'message' => 'Project renamed successfully.'
            ]);

        $this->assertDatabaseHas('projects', [
            'id' => $this->project->id,
            'title' => strtolower($newTitle),
        ]);
    }

    public function test_admin_cannot_rename_project(): void
    {
        $newTitle = 'Admin Updated Title';

        $response = $this->actingAs($this->admin)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => $newTitle
            ]);

        $response->assertForbidden()
            ->assertJson([
                'message' => 'You do not have permission to rename this project.'
            ]);

        $this->assertDatabaseMissing('projects', [
            'id' => $this->project->id,
            'title' => strtolower($newTitle),
        ]);
    }

    public function test_contributor_cannot_rename_project(): void
    {
        $newTitle = 'Contributor Updated Title';

        $response = $this->actingAs($this->contributor)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => $newTitle
            ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('projects', [
            'id' => $this->project->id,
            'title' => strtolower($newTitle),
        ]);
    }

    public function test_unauthenticated_user_cannot_rename_project(): void
    {
        $newTitle = 'Unauthorized Updated Title';

        $response = $this->patchJson("/projects/{$this->project->id}/rename", [
            'title' => $newTitle
        ]);

        $response->assertUnauthorized();
        $this->assertDatabaseMissing('projects', [
            'id' => $this->project->id,
            'title' => strtolower($newTitle),
        ]);
    }

    public function test_non_member_cannot_rename_project(): void
    {
        $nonMember = User::factory()->create();
        $newTitle = 'Non Member Updated Title';

        $response = $this->actingAs($nonMember)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => $newTitle
            ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('projects', [
            'id' => $this->project->id,
            'title' => strtolower($newTitle),
        ]);
    }

    public function test_title_is_required(): void
    {
        $response = $this->actingAs($this->creator)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => ''
            ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'title' => 'A project title is required.'
            ]);
    }

    public function test_title_minimum_length(): void
    {
        $response = $this->actingAs($this->creator)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => 'ab'
            ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'title' => 'The project title must be at least 3 characters long.'
            ]);
    }

    public function test_title_maximum_length(): void
    {
        $response = $this->actingAs($this->creator)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => str_repeat('a', 256)
            ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'title' => 'The project title cannot be longer than 255 characters.'
            ]);
    }

    public function test_rename_project_to_same_title(): void
    {
        $response = $this->actingAs($this->creator)
            ->patchJson("/projects/{$this->project->id}/rename", [
                'title' => $this->project->title
            ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors([
                'title' => 'This project title is already taken.'
            ]);
    }
}
