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
use Inertia\Inertia;
use Inertia\Response;

class ProjectInvitationController extends Controller
{
    public function __construct(
        private readonly GetEligibleUsers $getEligibleUsers,
        private readonly InviteUserToProject $inviteUserToProject,
    ) {}

    public function show(Request $request, Project $project): Response
    {
        if ($request->user()->cannot('invite', $project)) {
            abort(403, 'You do not have permission to invite users to this project.');
        }

        return Inertia::render('Project/InviteUser', [
            'project' => $project,
            'users' => [
                'data' => [],
                'current_page' => 1,
                'first_page_url' => '',
                'from' => 0,
                'last_page' => 1,
                'last_page_url' => '',
                'links' => [],
                'next_page_url' => null,
                'path' => '',
                'per_page' => 20,
                'prev_page_url' => null,
                'to' => 0,
                'total' => 0,
            ],
        ]);
    }

    /**
     * Get users that can be invited to the project.
     *
     * Excludes current project members and users with pending invitations.
     */
    public function searchUsers(Request $request, Project $project)
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

            return Inertia::render('Project/InviteUser', [
                'project' => $project,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Project/InviteUser', [
                'project' => $project,
                'error' => 'Failed to fetch eligible users.',
            ]);
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
        ]);

        try {
            $result = ($this->inviteUserToProject)(
                $project,
                $request->user(),
                $validated['invitee_id'],
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
}
