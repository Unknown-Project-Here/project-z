<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GitHubController;

Route::middleware('web')->prefix('github')->group(function () {
    Route::get('/profile', [GitHubController::class, 'getProfile']);
    Route::get('/repos', [GitHubController::class, 'getRepositories']);
    Route::get('/organizations', [GitHubController::class, 'getOrganizations']);
});