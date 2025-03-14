import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import NotificationMessage from '@/Layouts/components/notifications/NotificationMessage';
import { useNotificationStore } from '@/Layouts/components/notifications/store/notifications';
import { Notification } from '@/Layouts/components/notifications/types';
import { getIcon } from '@/Layouts/components/notifications/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function NotificationItemPage({
    notification,
}: {
    notification: Notification;
}) {
    const { id, type, created_at, read_at } = notification;
    const { markAsRead } = useNotificationStore();

    const handleMarkAsRead = () => {
        markAsRead(id);
    };

    return (
        <Card key={id} className="mb-4" onClick={handleMarkAsRead}>
            <CardContent className="flex items-start p-4">
                <div className="relative">
                    <div className="relative mr-4 mt-1">{getIcon(type)}</div>
                    {!read_at && (
                        <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                    )}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">
                        <NotificationMessage notification={notification} />
                    </p>
                    <p className="mt-1 text-xs">
                        {dayjs(created_at).fromNow()}
                    </p>
                </div>
                <Button variant="outline" size="sm" className="ml-4">
                    View
                </Button>
            </CardContent>
        </Card>
    );
}
