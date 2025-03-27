<?php

namespace App\Enums;

enum ProjectPermission: string
{
    // Project Management
    case PROJECT_RENAME = 'project.rename';
    case PROJECT_DELETE = 'project.delete';
    case PROJECT_UPDATE_STATUS = 'project.update_status';
    case PROJECT_EDIT = 'project.edit';
    case PROJECT_ARCHIVE = 'project.archive';

    // Member Management
    case MEMBER_INVITE = 'member.invite';
    case MEMBER_REMOVE = 'member.remove';
    case MEMBER_UPDATE_ROLE = 'member.update_role';
    case MEMBER_VIEW = 'member.view';
    case MEMBER_MANAGE_REQUESTS = 'member.manage_requests';
    case MEMBER_UPDATE_TO_CREATOR = 'member.update_to_creator';
}
