<?php

use App\Http\Controllers\Api\GitHubController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->prefix('github')->group(function () {
    Route::get('/profile', [GitHubController::class, 'getProfile']);
    Route::get('/repos', [GitHubController::class, 'getRepositories']);
    Route::get('/organizations', [GitHubController::class, 'getOrganizations']);
});
