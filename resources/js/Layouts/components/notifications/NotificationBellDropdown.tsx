/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import H3 from '@/components/ui/typography/H3';
import NotificationItem from '@/Layouts/components/notifications/NotificationItem';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationBellDropdown({
    notifications,
}: {
    notifications: any;
}) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        setUnreadCount(notifications?.length || 0);
    }, [notifications]);

    const handleReadNotification = (id: string) => {
        console.log(`Marking notification ${id} as read`);
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Bell className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-[350px] p-4">
                <H3>Notifications</H3>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification: any) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onRead={handleReadNotification}
                            />
                        ))
                    ) : (
                        <DropdownMenuItem disabled>
                            No new notifications
                        </DropdownMenuItem>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
