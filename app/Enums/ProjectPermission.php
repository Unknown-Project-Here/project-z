<?php

namespace App\Enums;

enum ProjectPermission: string
{
        // Project Management
    case PROJECT_RENAME = 'project.rename';
    case PROJECT_DELETE = 'project.delete';
    case PROJECT_UPDATE_STATUS = 'project.update_status';
    case PROJECT_EDIT_DETAILS = 'project.edit_details';
    case PROJECT_ARCHIVE = 'project.archive';

        // Member Management
    case MEMBER_INVITE = 'member.invite';
    case MEMBER_REMOVE = 'member.remove';
    case MEMBER_UPDATE_ROLE = 'member.update_role';
    case MEMBER_VIEW = 'member.view';

        // Task Management
    case TASK_CREATE = 'task.create';
    case TASK_EDIT = 'task.edit';
    case TASK_DELETE = 'task.delete';
    case TASK_ASSIGN = 'task.assign';
    case TASK_MOVE_STAGE = 'task.move_stage';
    case TASK_SET_PRIORITY = 'task.set_priority';
}
