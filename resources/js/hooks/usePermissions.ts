import { usePageProps } from '@/hooks/usePageProps';

export interface ProjectPermissions {
    invite: boolean;
    edit: boolean;
    request: boolean;
}

export interface Permissions {
    project: ProjectPermissions;
}

export function usePermissions(): Permissions {
    const { props } = usePageProps<{ permissions: Permissions }>();

    return props.permissions;
}
