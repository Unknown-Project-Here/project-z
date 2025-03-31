<?php

namespace App\Enums;

enum ProjectPermission: string
{
    // Project Management
    case PROJECT_MANAGE = 'project.manage';

    // Member Management
    case MEMBER_INVITE = 'member.invite';
    case MEMBER_REMOVE = 'member.remove';
    case MEMBER_REINSTATE = 'member.reinstate';
    case MEMBER_UPDATE_ROLE = 'member.update_role';
    case MEMBER_VIEW = 'member.view';
    case MEMBER_MANAGE_REQUESTS = 'member.manage_requests';
    case MEMBER_UPDATE_TO_CREATOR = 'member.update_to_creator';
}
