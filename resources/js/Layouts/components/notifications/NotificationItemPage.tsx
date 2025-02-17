import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationMessage from '@/Layouts/components/notifications/NotificationMessage';
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
    const { id, type, created_at } = notification;

    return (
        <Card key={id} className="mb-4">
            <CardContent className="flex items-start p-4">
                <div className="mr-4 mt-1">{getIcon(type)}</div>
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
