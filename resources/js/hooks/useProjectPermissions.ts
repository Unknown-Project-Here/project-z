import { usePermissions } from './usePermissions';

export function useProjectPermissions() {
    const permissions = usePermissions();

    return {
        canEditProject: permissions.project.edit,
        canInviteToProject: permissions.project.invite,
        canRequestToJoinProject: permissions.project.request,
        canManageRequests: permissions.project.manageRequests,
    };
}
