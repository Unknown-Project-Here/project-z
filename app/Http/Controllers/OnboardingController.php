<?php

namespace App\Http\Controllers;

use App\Actions\Options\CreateMissingOptions;
use App\Actions\Onboarding\MarkUserAsOnboarded;
use App\Actions\Onboarding\UpdateUserSkillLevel;
use App\Actions\Onboarding\UpdateUserTechStack;
use App\Http\Requests\OnboardingRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Pipeline;
use Inertia\Response;

class OnboardingController extends Controller
{

    public function show(): Response
    {
        return inertia()->render('Profile/Onboarding');
    }

    public function store(OnboardingRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                Pipeline::send($request->validated())
                    ->through([
                        CreateMissingOptions::class,
                        UpdateUserTechStack::class,
                        UpdateUserSkillLevel::class,
                        MarkUserAsOnboarded::class,
                    ])
                    ->then(fn($data) => $data);
            });

            return redirect()->route('profile.edit')
                ->with('status', 'onboarding-completed');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to complete onboarding: ' . $e->getMessage()]);
        }
    }
}
