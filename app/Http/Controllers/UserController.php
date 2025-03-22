<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\GitHub\GitHubApiService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function show(string $username): Response
    {
        $user = User::where('username', $username)->firstOrFail();
        $isOwnProfile = Auth::check() && Auth::id() === $user->id;

        $projects = $user->projects()
            ->select(['projects.id', 'projects.title', 'projects.description', 'projects.skill_level'])
            ->get();

        $skills = $user->techStack()
            ->join('options', 'user_tech_stacks.option_id', '=', 'options.id')
            ->pluck('options.name')
            ->toArray();

        return Inertia::render('User/Profile', [
            'profileUser' => [
                'username' => $user->username,
                'created_at' => $user->created_at,
                'avatar' => $user->avatar ?? null,
            ],
            'projects' => $projects,
            'skills' => $skills,
            'isOwnProfile' => $isOwnProfile,
        ]);
    }

    public function getUserRepositories(GitHubApiService $githubApiService)
    {
        try {
            $user = Auth::user();
            if (! $user) {
                return response()->json([]);
            }

            $githubApiService->setUser($user);
            $repositories = $githubApiService->getPersonandOrganizationRepos();

            return response()->json(["success" => true, "data" => $repositories]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => null,
            ], 500);
        }
    }
}
