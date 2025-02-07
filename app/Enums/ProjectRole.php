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
                ProjectPermission::PROJECT_EDIT_DETAILS,
                ProjectPermission::PROJECT_UPDATE_STATUS,
                ProjectPermission::MEMBER_INVITE,
                ProjectPermission::MEMBER_REMOVE,

                ProjectPermission::MEMBER_UPDATE_ROLE,
                ProjectPermission::MEMBER_VIEW,
                ProjectPermission::TASK_CREATE,
                ProjectPermission::TASK_EDIT,
                ProjectPermission::TASK_DELETE,
                ProjectPermission::TASK_ASSIGN,
                ProjectPermission::TASK_MOVE_STAGE,
                ProjectPermission::TASK_SET_PRIORITY,
            ]),
            self::CONTRIBUTOR => in_array($permission, [
                ProjectPermission::MEMBER_VIEW,
                ProjectPermission::TASK_CREATE,
                ProjectPermission::TASK_EDIT,
                ProjectPermission::TASK_MOVE_STAGE,
                ProjectPermission::TASK_SET_PRIORITY,
            ]),
        };
    }
}
