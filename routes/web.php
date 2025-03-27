<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectInvitationController;
use App\Http\Controllers\ProjectRequestController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/user/repositories', [UserController::class, 'getUserRepositories'])->name('user.repositories')->middleware(['auth', 'verified']);
Route::get('/user/{username}', [UserController::class, 'show'])->name('user.profile');

Route::get('/dashboard', function () {
    return redirect()->route('user.profile', ['username' => Auth::user()->username]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::prefix('profile')->name('profile.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');
    Route::post('/onboarding/store', [OnboardingController::class, 'store'])
        ->name('onboarding.store');
});

Route::middleware(['auth', 'verified'])->prefix('settings')->name('settings.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
});

// Projects routes
Route::prefix('projects')->name('projects.')->group(function () {
    Route::controller(ProjectController::class)->group(function () {

        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create')->middleware(['auth', 'verified']);
        Route::post('/', 'store')->name('store')->middleware(['auth', 'verified']);
        Route::get('/{project}', 'show')->name('show');

        Route::middleware(['auth', 'verified'])->group(function () {
            Route::get('/{project}/edit', 'edit')->name('edit');
            Route::get('/{project}/request', 'request')->name('request');
            Route::post('/{project}/configure/request/toggle', 'handleAllowRequestConfiguration')->name('configure.request.toggle');
            Route::post('/{project}/configure/request/questions', 'saveApplicationQuestions')->name('configure.request.questions.store');
            Route::post('/{project}/configure/repository', 'connectRepository')->name('configure.repository');
        });
    });

    Route::prefix('{project}/applications')->name('applications.')->middleware(['auth', 'verified'])->group(function () {
        Route::controller(ProjectRequestController::class)->group(function () {
            Route::post('/{application}/accept', 'acceptRequest')->name('accept');
            Route::post('/{application}/reject', 'rejectRequest')->name('reject');
        });
    });

    Route::prefix('{project}/invite')->name('invite.')->middleware(['auth', 'verified'])->group(function () {
        Route::controller(ProjectInvitationController::class)->group(function () {
            Route::get('/searchUsers', 'searchUsers')->name('searchUsers');
            Route::post('/', 'store')->name('store');
        });
    });

    Route::prefix('{project}/members')->name('members.')->middleware(['auth', 'verified'])->group(function () {
        Route::controller(ProjectController::class)->group(function () {
            Route::delete('/{user}', 'removeMember')->name('removeMember');
            Route::post('/updateRole', 'updateMemberRole')->name('updateRole');
        });
    });
});

// Notifications routes
Route::prefix('notifications')->name('notifications.')->group(function () {
    Route::controller(NotificationController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/markAllAsRead', 'markAllAsRead')->name('markAllAsRead');
        Route::post('/{notification}/markAsRead', 'markNotificationAsRead')->name('markAsRead');
    });
});

// Messages routes
Route::prefix('messages')->name('messages.')->middleware(['auth', 'verified'])->group(function () {
    Route::controller(MessageController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/upload-image', 'uploadImage')->name('uploadImage');
        Route::get('/{message}', 'message')->name('message');
        Route::post('/message', 'store')->name('store');
    });
});

Route::githubWebhooks('github/webhook');

require __DIR__.'/auth.php';
