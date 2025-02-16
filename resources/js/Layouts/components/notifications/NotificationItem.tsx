import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Notification } from '@/Layouts/components/notifications/types';
import { getIcon, getMessage } from '@/Layouts/components/notifications/utils';

interface NotificationItemProps {
    notification: Notification;
    onRead: (id: string) => void;
}

export default function NotificationItem({
    notification,
    onRead,
}: NotificationItemProps) {
    const { id, type } = notification;

    return (
        <DropdownMenuItem
            className="flex cursor-pointer items-start px-4 py-2"
            onClick={() => onRead(id)}
        >
            {getIcon(type)}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                    {getMessage(notification)}
                </p>
            </div>
        </DropdownMenuItem>
    );
}
