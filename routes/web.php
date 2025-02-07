<?php

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
});

// Projects routes
Route::prefix('projects')->name('projects.')->group(function () {
    Route::controller(ProjectController::class)->group(function () {
        // Public routes
        Route::get('/', 'index')->name('index');
        Route::get('/{project}', 'show')->name('show');

        // Protected routes
        Route::middleware(['auth', 'verified'])->group(function () {
            // Project Creation
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');

            // Project Management
            Route::patch('/{project}/rename', 'rename')
                ->name('rename')
                ->middleware('can:rename,project');

            Route::delete('/{project}', 'destroy')
                ->name('destroy')
                ->middleware('can:delete,project');
        });
    });
});

require __DIR__ . '/auth.php';
