import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Notification } from '@/Layouts/components/notifications/types';
import { getIcon } from '@/Layouts/components/notifications/utils';
import { cn } from '@/lib/utils';
import axios from 'axios';
import NotificationMessage from './NotificationMessage';

interface NotificationItemBellDropdownProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    shouldShowLink?: boolean;
}

export default function NotificationItemBellDropdown({
    notification,
    onMarkAsRead,
    shouldShowLink = true,
}: NotificationItemBellDropdownProps) {
    const handleClick = () => {
        if (notification.read_at) return;
        axios
            .post(
                route('notifications.markAsRead', {
                    notification: notification.id,
                }),
            )
            .then(() => {
                onMarkAsRead(notification.id);
            });
    };

    return (
        <DropdownMenuItem
            className={cn(
                'flex cursor-pointer items-start px-4 py-2',
                !notification.read_at && 'font-semibold',
            )}
            onClick={handleClick}
        >
            <div className="relative">
                {getIcon(notification.type)}
                {!notification.read_at && (
                    <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                    <NotificationMessage
                        notification={notification}
                        shouldShowLink={shouldShowLink}
                    />
                </p>
            </div>
        </DropdownMenuItem>
    );
}
