/* eslint-disable @typescript-eslint/no-explicit-any */
export enum NotificationType {
    PROJECT_REQUEST = 'App\\Notifications\\ProjectJoinRequestNotification',
    PROJECT_INVITATION = 'App\\Notifications\\ProjectInvitationNotification',
}

export interface BaseNotification {
    id: string;
    type: NotificationType;
    data: Record<string, any>;
    created_at: string;
    read_at: string | null;
}

export interface ProjectRequestNotification extends BaseNotification {
    type: NotificationType.PROJECT_REQUEST;
    data: {
        type: 'App\\Notifications\\ProjectJoinRequestNotification';
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
        type: 'App\\Notifications\\ProjectInvitationNotification';
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
