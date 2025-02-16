/* eslint-disable @typescript-eslint/no-explicit-any */
export enum NotificationType {
    PROJECT_REQUEST = 'project_request',
    PROJECT_INVITATION = 'project_invitation',
}

export interface BaseNotification {
    id: string;
    type: NotificationType;
    data: Record<string, any>;
}

export interface ProjectRequestNotification extends BaseNotification {
    type: NotificationType.PROJECT_REQUEST;
    data: {
        type: 'project_request';
        request_id: number;
        project_id: number;
        project_title: string;
        requester_name: string;
        requester_id: number;
    };
}

export interface ProjectInvitationNotification extends BaseNotification {
    type: NotificationType.PROJECT_INVITATION;
    data: {
        type: 'project_invitation';
        invitation_id: number;
        project_id: number;
        project_title: string;
        inviter_name: string;
        role: string;
        expires_at: string;
    };
}

export type Notification =
    | ProjectRequestNotification
    | ProjectInvitationNotification;
