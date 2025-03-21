<?php

namespace App\Http\Controllers;

use App\Enums\ProjectRole;
use App\Models\Project;
use App\Models\ProjectApplicationRequestAnswers;
use App\Models\ProjectRequest;
use App\Notifications\ProjectRequestAcceptedNotification;
use App\Notifications\ProjectRequestRejectedNotification;
use Illuminate\Support\Facades\Notification;
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

        return Inertia::render('Project/MemberApplicationList', [
            'project' => $project,
            'applications' => $applications,
        ]);
    }

    public function show(Project $project, ProjectRequest $application)
    {
        if (! request()->user()?->can('edit', $project)) {
            abort(403, 'You do not have permission to view this page.');
        }

        $application->load('user:id,username,avatar');

        $user_id = $application->user_id;
        $project_id = $application->project_id;

        $questions = $project->applicationQuestions()->pluck('question', 'id')->toArray();

        $answers = ProjectApplicationRequestAnswers::where('user_id', $user_id)
            ->where('project_id', $project_id)
            ->whereIn('question_id', array_keys($questions))
            ->pluck('answer', 'question_id')
            ->all();

        $questions_and_answers = array_map(function ($questionId) use ($questions, $answers) {
            return [
                'question' => $questions[$questionId],
                'answer' => $answers[$questionId] ?? null,
            ];
        }, array_keys($questions));

        $application['questions_and_answers'] = $questions_and_answers;
        $applicationData = $application->only(['id', 'project_id', 'created_at', 'user', 'questions_and_answers']);

        return Inertia::render('Project/MemberApplication', [
            'project' => ['id' => $project->id],
            'application' => $applicationData,
        ]);
    }

    public function acceptRequest(Project $project, ProjectRequest $application)
    {
        if (! request()->user()?->can('manageRequests', $project)) {
            abort(403, 'You do not have permission to view this page.');
        }

        $project->members()->attach($application->user_id, ['role' => ProjectRole::CONTRIBUTOR]);
        Notification::send($application->user, new ProjectRequestAcceptedNotification($application));
        ProjectApplicationRequestAnswers::where('project_id', $project->id)->where('user_id', $application->user_id)->delete();
        $application->delete();

        return response()->json([
            'success' => true,
            'message' => 'Request accepted successfully.',
        ]);
    }

    public function rejectRequest(Project $project, ProjectRequest $application)
    {
        if (! request()->user()?->can('manageRequests', $project)) {
            abort(403, 'You do not have permission to view this page.');
        }

        Notification::send($application->user, new ProjectRequestRejectedNotification($application));
        ProjectApplicationRequestAnswers::where('project_id', $project->id)->where('user_id', $application->user_id)->delete();
        $application->delete();

        return response()->json([
            'success' => true,
            'message' => 'Application rejected successfully.',
        ]);
    }
}
