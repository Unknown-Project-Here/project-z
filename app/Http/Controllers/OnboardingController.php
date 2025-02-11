<?php

namespace App\Http\Controllers;

use App\Actions\Onboarding\CreateMissingOptions;
use App\Actions\Onboarding\MarkUserAsOnboarded;
use App\Actions\Onboarding\UpdateUserTechStack;
use App\Http\Requests\OnboardingRequest;
use Illuminate\Pipeline\Pipeline;
use Illuminate\Support\Facades\DB;
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

                app(Pipeline::class)
                    ->send($request->validated())
                    ->through([
                        CreateMissingOptions::class,
                        UpdateUserTechStack::class,
                        MarkUserAsOnboarded::class,
                    ])
                    ->then(fn($data) => $data);
            });

            return redirect()->route('profile.edit')
                ->with('status', 'onboarding-completed');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to complete onboarding.']);
        }
    }
}
