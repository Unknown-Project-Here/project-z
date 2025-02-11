<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Option;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OnboardingTest extends TestCase
{
    use RefreshDatabase;

    private array $validOnboardingData;
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        Category::insert([
            ['name' => 'domain'],
            ['name' => 'language'],
            ['name' => 'framework'],
            ['name' => 'specialization'],
        ]);

        $this->user = User::factory()->create();

        $this->validOnboardingData = [
            'skills' => [
                'domain' => ['Frontend Development', 'JAMstack'],
                'language' => ['Objective-C'],
                'framework' => ['FastAPI'],
                'expertise' => 'intermediate',
                'specialization' => ['Cloud Architect', 'Machine Learning Engineer']
            ]
        ];
    }

    public function test_unverified_users_cannot_complete_onboarding(): void

    {
        $user = User::factory()->unverified()->create();

        $response = $this->actingAs($user)
            ->post('/profile/onboarding/store', $this->validOnboardingData);

        $response->assertRedirectToRoute('verification.notice');
        $this->assertFalse($user->fresh()->onboarded);
    }

    public function test_onboarding_creates_missing_options(): void
    {

        $this->actingAs($this->user)
            ->post('/profile/onboarding/store', $this->validOnboardingData);

        foreach ($this->validOnboardingData['skills'] as $key => $values) {
            if ($key !== 'expertise') {
                foreach ($values as $value) {
                    $this->assertDatabaseHas('options', [
                        'name' => strtolower($value),
                        'category_id' => Category::where('name', $key)->first()->id
                    ]);
                }
            }
        }
    }

    public function test_onboarding_marks_user_as_onboarded(): void
    {
        $this->assertFalse($this->user->onboarded);

        $this->actingAs($this->user)
            ->post('/profile/onboarding/store', $this->validOnboardingData);

        $this->assertTrue($this->user->fresh()->onboarded);
    }

    public function test_onboarding_requires_valid_data(): void
    {
        $invalidData = [
            'skills' => [
                'domain' => [],
                'language' => [],
                'framework' => [],
                'expertise' => 'invalid-level',
                'specialization' => []
            ]
        ];

        $response = $this->actingAs($this->user)
            ->post('/profile/onboarding/store', $invalidData);

        $response->assertSessionHasErrors([
            'skills.domain',
        ]);

        $this->assertFalse($this->user->fresh()->onboarded);
    }

    public function test_onboarding_updates_user_tech_stack(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/profile/onboarding/store', $this->validOnboardingData);

        $response->assertRedirectToRoute('profile.edit');
        $response->assertSessionHas('status', 'onboarding-completed');

        foreach ($this->validOnboardingData['skills'] as $category => $values) {
            if ($category === 'expertise') continue;

            foreach ($values as $value) {
                $option = Option::where('name', strtolower($value))
                    ->whereHas('category', fn($query) => $query->where('name', $category))
                    ->first();

                $this->assertNotNull($option, "Option not found: {$value} in category {$category}");

                $this->assertDatabaseHas('user_tech_stacks', [
                    'user_id' => $this->user->id,
                    'option_id' => $option->id,
                    'skill_level' => $this->validOnboardingData['skills']['expertise']
                ]);
            }
        }
    }

    public function test_onboarding_validates_skill_level(): void
    {
        $invalidData = $this->validOnboardingData;
        $invalidData['skills']['expertise'] = 'not-a-valid-level';

        $response = $this->actingAs($this->user)
            ->post('/profile/onboarding/store', $invalidData);

        $response->assertSessionHasErrors(['skills.expertise']);
    }

    public function test_onboarding_requires_at_least_one_item_per_category(): void
    {
        $categories = ['domain', 'language', 'framework', 'specialization'];

        foreach ($categories as $category) {
            $invalidData = $this->validOnboardingData;
            $invalidData['skills'][$category] = [];

            $response = $this->actingAs($this->user)
                ->post('/profile/onboarding/store', $invalidData);

            $response->assertSessionHasErrors(["skills.{$category}"]);
        }
    }
}
