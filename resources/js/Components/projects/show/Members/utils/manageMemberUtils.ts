const ROLE_HIERARCHY = {
    creator: 3,
    admin: 2,
    contributor: 1,
} as const;

export type Role = keyof typeof ROLE_HIERARCHY;

export function sameOrHigherRole(
    currentUserRole: Role,
    targetUserRole: Role,
): boolean {
    const currentUserPriority = ROLE_HIERARCHY[currentUserRole];
    const targetUserPriority = ROLE_HIERARCHY[targetUserRole];

    return targetUserPriority >= currentUserPriority;
}

export const getAllowedRoleOptions = ({
    currentRole,
    canUpdateMemberRole,
    canUpdateToCreator,
}: {
    currentRole: Role;
    canUpdateMemberRole: boolean;
    canUpdateToCreator: boolean;
}): Role[] => {
    if (!canUpdateMemberRole) return [];

    const allRoles: Role[] = ['creator', 'admin', 'contributor'];
    return allRoles.filter(
        (role) =>
            role !== currentRole && (role !== 'creator' || canUpdateToCreator),
    );
};
