<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectInvitationController;
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
        ->name('onboarding.store');
});

// Projects routes
Route::prefix('projects')->name('projects.')->group(function () {
    Route::controller(ProjectController::class)->group(function () {
        // Public routes
        Route::get('/', 'index')->name('index');

        // Protected routes
        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
        });

        Route::get('/{project}', 'show')->name('show');

        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/{project}/edit', 'edit')->name('edit');
            Route::patch('/{project}', 'update')->name('update');
            Route::patch('/{project}/rename', 'rename')->name('rename');
            Route::delete('/{project}', 'destroy')->name('destroy');
        });
    });

    Route::controller(ProjectInvitationController::class)->group(function () {
        Route::get('/{project}/search-users', 'getUsers')->name('search-users');
        Route::post('/{project}/invite', 'store')->name('invite');
        Route::post('/{project}/request', 'request')->name('request');
    });
});

Route::prefix('notifications')->name('notifications.')->group(function () {
    Route::controller(NotificationController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/markAllAsRead', 'markAllAsRead')->name('markAllAsRead');
        Route::post('/{notification}/markAsRead', 'markNotificationAsRead')->name('markAsRead');
    });
});

require __DIR__ . '/auth.php';
