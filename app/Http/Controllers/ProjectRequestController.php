<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectRequestController extends Controller
{

    public function index(Project $project)
    {
        if (! request()->user()?->can('edit', $project)) {
            abort(403, 'You do not have permission to view this page.');
        }

        $applications = $project->applications()
            ->with('user:id,username,avatar')
            ->paginate(10)
            ->through(function ($application) {
                return [
                    'id' => $application->id,
                    'project_id' => $application->project_id,
                    'user' => [
                        'user_id' => $application->user->id,
                        'username' => $application->user->username,
                        'avatar' => $application->user->avatar,
                    ],
                    'created_at' => $application->created_at,
                ];
            });

        return Inertia::render('Project/MemberApplications', [
            'project' => $project,
            'applications' => $applications,
        ]);
    }
}
