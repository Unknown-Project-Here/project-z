<?php

namespace App\Http\Middleware\Actions;

use Illuminate\Http\Request;

class HandleProjectPermissions
{
    public function handle(Request $request): array
    {
        $project = $request->route('project');
        $user = $request->user();

        if (! $project || ! $user) {
            return $this->getEmptyPermissions();
        }

        return [
            'invite' => $user->can('invite', $project) ?? false,
            'manage' => $user->can('manage', $project) ?? false,
            'request' => $user->can('request', $project),
            'manageRequests' => $user->can('manageRequests', $project) ?? false,
            'removeMember' => $user->can('removeMember', $project) ?? false,
            'updateMemberRole' => $user->can('updateMemberRole', $project) ?? false,
            'updateToCreator' => $user->can('updateToCreator', $project) ?? false,
            'removeFromBlocklist' => $user->can('reinstateMember', $project) ?? false,
            'userRole' => $user->getRole($project),
        ];
    }

    private function getEmptyPermissions(): array
    {
        return [
            'invite' => false,
            'manage' => false,
            'request' => false,
            'manageRequests' => false,
            'removeMember' => false,
            'updateMemberRole' => false,
            'updateToCreator' => false,
            'removeFromBlocklist' => false,
            'userRole' => null,
        ];
    }
}