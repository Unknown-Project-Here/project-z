import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationMessage from '@/Layouts/components/notifications/NotificationMessage';
import { Notification } from '@/Layouts/components/notifications/types';
import { getIcon } from '@/Layouts/components/notifications/utils';
import { cn } from '@/lib/utils';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { toast } from 'sonner';

dayjs.extend(relativeTime);

export default function NotificationItemPage({
    notification: initialNotification,
}: {
    notification: Notification;
}) {
    const [notification, setNotification] = useState(initialNotification);
    const { id, type, created_at, read_at } = notification;

    const handleMarkAsRead = () => {
        if (read_at) return;

        axios
            .post(route('notifications.markAsRead', { notification: id }))
            .catch(() => {
                toast.error('Error marking notification as read.');
            })
            .then(() => {
                setNotification({
                    ...notification,
                    read_at: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
                });
            });
    };

    return (
        <Card key={id} className="mb-4" onClick={handleMarkAsRead}>
            <CardContent className="flex items-start p-4">
                <div className="relative mr-4 mt-1">
                    {getIcon(type)}
                    {!read_at && (
                        <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                    )}
                </div>
                <div className="flex-1">
                    <p
                        className={cn(
                            'text-sm font-medium',
                            !read_at && 'font-semibold',
                        )}
                    >
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
