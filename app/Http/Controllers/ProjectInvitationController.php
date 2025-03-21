<?php

namespace App\Http\Controllers;

use App\Actions\Project\Invite\GetEligibleUsers;
use App\Actions\Project\Invite\InviteUserToProject;
use App\Models\Project;
use App\Models\ProjectRequest;
use App\Models\ProjectApplicationRequestAnswers;
use App\Notifications\ProjectJoinRequestNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Notification;

class ProjectInvitationController extends Controller
{
    public function __construct(
        private readonly GetEligibleUsers $getEligibleUsers,
        private readonly InviteUserToProject $inviteUserToProject,
    ) {}

    /**
     * Get users that can be invited to the project.
     *
     * Excludes current project members and users with pending invitations.
     */
    public function getUsers(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('invite', $project)) {
            abort(403, 'You do not have permission to invite users to this project.');
        }

        try {
            $validated = $request->validate([
                'search' => 'required|string|min:2|max:16',
            ]);

            $users = ($this->getEligibleUsers)(
                $project,
                $validated['search']
            );

            return response()->json([
                'success' => true,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch eligible users.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    /**
     * Invite a user to the project.
     */
    public function store(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('invite', $project)) {
            abort(403, 'You do not have permission to invite users to this project.');
        }

        $validated = $request->validate([
            'invitee_id' => 'required|exists:users,id',
            'role' => 'required|in:creator,admin,contributor',
        ]);

        try {
            $result = ($this->inviteUserToProject)(
                $project,
                $request->user(),
                $validated['invitee_id'],
                $validated['role']
            );

            if (! $result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message'],
                ], 422);
            }

            return response()->json([
                'success' => true,
                'message' => $result['message'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invitation.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function request(Request $request, Project $project): RedirectResponse
    {
        if ($request->user()?->cannot('request', $project)) {
            abort(403, 'You do not have permission to request to join this project.');
        }

        try {
            $validated = $request->validate([
                'answers' => 'sometimes|array',
                'answers.*.question_id' => 'required|string|exists:project_application_request_questions,id',
                'answers.*.answer' => 'required|string|max:255',
            ]);

            if ($request->has('answers') && !empty($validated['answers'])) {
                $answersToInsert = collect($validated['answers'])->map(function ($answer) use ($project, $request) {
                    return [
                        'answer' => $answer['answer'],
                        'user_id' => $request->user()->id,
                        'question_id' => $answer['question_id'],
                        'project_id' => $project->id,
                    ];
                })->toArray();
                ProjectApplicationRequestAnswers::insert($answersToInsert);
            }

            $projectRequest = ProjectRequest::create([
                'project_id' => $project->id,
                'user_id' => $request->user()->id,
            ]);


            $projectMembers = $project->members()
                ->wherePivotIn('role', ['creator', 'admin'])
                ->get();

            Notification::send($projectMembers, new ProjectJoinRequestNotification($projectRequest));

            return redirect()->route('projects.show', $project)->with('success', 'Your request to join the project has been sent.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'success' => false,
                'message' => 'Failed to send join request.',
                'debug' => config('app.debug') ? $e->getMessage() : null,
            ]);
        }
    }
}
