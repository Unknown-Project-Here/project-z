/* eslint-disable @typescript-eslint/no-explicit-any */
export enum NotificationType {
    PROJECT_REQUEST = 'App\\Notifications\\ProjectJoinRequestNotification',
    PROJECT_INVITATION = 'App\\Notifications\\ProjectInvitationNotification',
}

export interface BaseNotification {
    id: string;
    type: NotificationType;
    created_at: string;
    read_at: string | null;
}

export interface ProjectRequestNotification extends BaseNotification {
    type: NotificationType.PROJECT_REQUEST;
    request_id: number;
    project_id: number;
    project_title: string;
    requester_name: string;
    requester_id: number;
}

export interface ProjectInvitationNotification extends BaseNotification {
    type: NotificationType.PROJECT_INVITATION;
    invitation_id: number;
    project_id: number;
    project_title: string;
    inviter_name: string;
    role: string;
}

export type Notification =
    | ProjectRequestNotification
    | ProjectInvitationNotification;
