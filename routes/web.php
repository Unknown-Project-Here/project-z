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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Projects routes
Route::controller(ProjectController::class)->group(function () {
    // Public routes
    Route::get('/projects', 'index')->name('projects.index');
    Route::get('/projects/{project}', 'show')->name('projects.show');
    
    Route::middleware('auth')->group(function () {
        Route::get('/projects/create', 'create')->name('projects.create');
        Route::post('/projects', 'store')->name('projects.store');
        Route::get('/projects/{project}/edit', 'edit')->name('projects.edit');
        Route::patch('/projects/{project}', 'update')->name('projects.update');
        Route::delete('/projects/{project}', 'destroy')->name('projects.destroy');
    });
});

require __DIR__.'/auth.php';
