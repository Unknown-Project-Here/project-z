<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function show(): Response
    {
        return inertia()->render('Profile/Onboarding');
    }

    public function update(Request $request)
    {
        logger($request->all());
    }
}
