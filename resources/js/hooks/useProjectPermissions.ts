import { usePermissions } from './usePermissions';

export function useProjectPermissions() {
    const permissions = usePermissions();

    return {
        canManageProject: permissions.project.manage,
        canInviteToProject: permissions.project.invite,
        canRequestToJoinProject: permissions.project.request,
        canManageRequests: permissions.project.manageRequests,
        canRemoveMember: permissions.project.removeMember,
        canUpdateMemberRole: permissions.project.updateMemberRole,
        canUpdateToCreator: permissions.project.updateToCreator,
        userRole: permissions.project.userRole,
        canRemoveFromBlocklist: permissions.project.removeFromBlocklist,
    };
}
