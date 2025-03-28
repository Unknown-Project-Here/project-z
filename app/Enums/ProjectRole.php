<?php

namespace App\Enums;

enum ProjectRole: string
{
    case CREATOR = 'creator';
    case ADMIN = 'admin';
    case CONTRIBUTOR = 'contributor';

    public function hasPermission(ProjectPermission $permission): bool
    {
        return match ($this) {
            self::CREATOR => true,
            self::ADMIN => in_array($permission, [
                ProjectPermission::PROJECT_EDIT,
                ProjectPermission::PROJECT_UPDATE_STATUS,

                ProjectPermission::MEMBER_INVITE,
                ProjectPermission::MEMBER_REMOVE,
                ProjectPermission::MEMBER_UPDATE_ROLE,
                ProjectPermission::MEMBER_VIEW,
                ProjectPermission::MEMBER_REINSTATE,
            ]),
            self::CONTRIBUTOR => in_array($permission, [
                ProjectPermission::MEMBER_VIEW,
            ]),
        };
    }
}
