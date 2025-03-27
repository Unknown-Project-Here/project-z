<?php

namespace App\Http\Middleware\Actions;

use Illuminate\Http\Request;

class HandleProjectPermissions
{
    public function handle(Request $request): array
    {
        $project = $request->route('project');
        $user = $request->user();

        if (!$project || !$user) {
            return $this->getEmptyPermissions();
        }

        return [
            'invite' => $user->can('invite', $project) ?? false,
            'edit' => $user->can('edit', $project) ?? false,
            'request' => $user->can('request', $project) && $project->is_requestable ?? false,
            'manageRequests' => $user->can('manageRequests', $project) ?? false,
            'removeMember' => $user->can('removeMember', $project) ?? false,
            'updateMemberRole' => $user->can('updateMemberRole', $project) ?? false,
            'updateToCreator' => $user->can('updateToCreator', $project) ?? false,
            'userRole' => $user->getRole($project),
        ];
    }

    private function getEmptyPermissions(): array
    {
        return [
            'invite' => false,
            'edit' => false,
            'request' => false,
            'manageRequests' => false,
            'removeMember' => false,
            'updateMemberRole' => false,
            'updateToCreator' => false,
            'userRole' => null,
        ];
    }
}