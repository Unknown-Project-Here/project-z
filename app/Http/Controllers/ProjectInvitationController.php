<?php

namespace App\Http\Controllers;

use App\Actions\Project\Invite\GetEligibleUsers;
use App\Actions\Project\Invite\InviteUserToProject;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
    public function index(Request $request, Project $project): JsonResponse
    {
        if ($request->user()->cannot('invite', $project)) {
            abort(403, 'You do not have permission to invite users to this project.');
        }

        try {
            $validated = $request->validate([
                'search' => 'nullable|string|min:2|max:16',
            ]);

            $users = ($this->getEligibleUsers)(
                $project,
                $validated['search'] ?? null
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
}
