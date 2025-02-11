<?php

use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::prefix('profile')->name('profile.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');
    Route::post('/onboarding/store', [OnboardingController::class, 'store'])
        ->name('onboarding');
});

// Projects routes
Route::prefix('projects')->name('projects.')->group(function () {
    Route::controller(ProjectController::class)->group(function () {
        // Public routes
        Route::get('/', 'index')->name('index');
        Route::get('/{project}', 'show')->name('show');

        // Protected routes
        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::patch('/{project}/rename', 'rename')->name('rename');
            Route::delete('/{project}', 'destroy')->name('destroy');
        });
    });
});

require __DIR__ . '/auth.php';
