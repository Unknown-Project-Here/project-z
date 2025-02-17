import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Notification } from '@/Layouts/components/notifications/types';
import { getIcon } from '@/Layouts/components/notifications/utils';
import NotificationMessage from './NotificationMessage';

interface NotificationItemBellDropdownProps {
    notification: Notification;
    onRead: (id: string) => void;
    shouldShowLink?: boolean;
}

export default function NotificationItemBellDropdown({
    notification,
    onRead,
    shouldShowLink = true,
}: NotificationItemBellDropdownProps) {
    const { id, type } = notification;

    return (
        <DropdownMenuItem
            className="flex cursor-pointer items-start px-4 py-2"
            onClick={() => onRead(id)}
        >
            {getIcon(type)}
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
