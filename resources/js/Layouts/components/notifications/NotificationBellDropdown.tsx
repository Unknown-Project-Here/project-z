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
import NotificationItemBellDropdown from '@/Layouts/components/notifications/NotificationItemBellDropdown';
import { Link } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationBellDropdown({
    notifications,
}: {
    notifications: any;
}) {
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setUnreadCount(notifications?.length || 0);
    }, [notifications]);

    const handleReadNotification = (id: string) => {
        console.log(`Marking notification ${id} as read`);
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                            <NotificationItemBellDropdown
                                key={notification.id}
                                notification={notification}
                                onRead={handleReadNotification}
                                shouldShowLink={false}
                            />
                        ))
                    ) : (
                        <DropdownMenuItem disabled>
                            No new notifications
                        </DropdownMenuItem>
                    )}
                </div>
                <Button asChild className="mt-4 w-full" onClick={closeDropdown}>
                    <Link href="/notifications">View all notifications</Link>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
