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
    const { type, data } = notification;

    switch (type) {
        case NotificationType.PROJECT_REQUEST:
            return (
                <span>
                    {shouldShowLink ? (
                        <Link
                            href={`/users/${data.requester_name}`}
                            className="font-medium text-primary hover:underline"
                        >
                            {data.requester_name + ' '}
                        </Link>
                    ) : (
                        `${data.requester_name} `
                    )}
                    requested to join{' '}
                    {shouldShowLink ? (
                        <Link
                            href={route('projects.show', data.project_id)}
                            className="font-medium text-primary hover:underline"
                        >
                            "{data.project_title} "
                        </Link>
                    ) : (
                        `"${data.project_title}" `
                    )}
                </span>
            );
        case NotificationType.PROJECT_INVITATION:
            return (
                <span>
                    {shouldShowLink ? (
                        <Link
                            href={`/users/${data.inviter_name}`}
                            className="font-medium text-primary hover:underline"
                        >
                            {data.inviter_name + ' '}
                        </Link>
                    ) : (
                        `${data.inviter_name} `
                    )}
                    invited you to{' '}
                    {shouldShowLink ? (
                        <Link
                            href={route('projects.show', data.project_id)}
                            className="font-medium text-primary hover:underline"
                        >
                            {data.project_title + ' '}
                        </Link>
                    ) : (
                        `${data.project_title} `
                    )}
                    as {data.role}
                </span>
            );
        default:
            return <span>Unknown notification type</span>;
    }
}
