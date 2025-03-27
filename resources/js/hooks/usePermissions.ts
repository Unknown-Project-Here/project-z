import { usePageProps } from '@/hooks/usePageProps';

export interface ProjectPermissions {
    invite: boolean;
    edit: boolean;
    request: boolean;
    manageRequests: boolean;
    removeMember: boolean;
    updateMemberRole: boolean;
    updateToCreator: boolean;
    userRole: 'creator' | 'admin' | 'contributor';
}

export interface Permissions {
    project: ProjectPermissions;
}

export function usePermissions(): Permissions {
    const { props } = usePageProps<{ permissions: Permissions }>();

    return props.permissions;
}
