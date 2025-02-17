import { Link } from '@inertiajs/react';
import { Notification, NotificationType } from './types';

interface NotificationMessageProps {
    notification: Notification;
    shouldShowLink?: boolean;
}

export default function NotificationMessage({
    notification,
    shouldShowLink = true,
}: NotificationMessageProps) {
    const { type } = notification;

    switch (type) {
        case NotificationType.PROJECT_REQUEST: {
            const { requester_name, project_title, project_id } = notification;
            return (
                <span>
                    {shouldShowLink ? (
                        <Link
                            href={`/users/${requester_name}`}
                            className="font-medium text-primary hover:underline"
                        >
                            {requester_name + ' '}
                        </Link>
                    ) : (
                        `${requester_name} `
                    )}
                    requested to join{' '}
                    {shouldShowLink ? (
                        <Link
                            href={route('projects.show', project_id)}
                            className="font-medium text-primary hover:underline"
                        >
                            "{project_title} "
                        </Link>
                    ) : (
                        `"${project_title}" `
                    )}
                </span>
            );
        }
        case NotificationType.PROJECT_INVITATION: {
            const { inviter_name, project_title, project_id, role } =
                notification;
            return (
                <span>
                    {shouldShowLink ? (
                        <Link
                            href={`/users/${inviter_name}`}
                            className="font-medium text-primary hover:underline"
                        >
                            {inviter_name + ' '}
                        </Link>
                    ) : (
                        `${inviter_name} `
                    )}
                    invited you to{' '}
                    {shouldShowLink ? (
                        <Link
                            href={route('projects.show', project_id)}
                            className="font-medium text-primary hover:underline"
                        >
                            {project_title + ' '}
                        </Link>
                    ) : (
                        `${project_title} `
                    )}
                    as {role}
                </span>
            );
        }
        default:
            return <span>Unknown notification type</span>;
    }
}
