import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import H3 from '@/components/ui/typography/H3';
import NotificationItemBellDropdown from '@/Layouts/components/notifications/NotificationItemBellDropdown';
import {
    Notification,
    NotificationType,
} from '@/Layouts/components/notifications/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationBellDropdown({
    notifications: initialNotifications,
}: {
    notifications: Notification[];
}) {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage().props as { auth: { user: { id: number } } };

    useEffect(() => {
        const channel = window.Echo.private(`App.Models.User.${auth.user.id}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        channel.notification((wsNotification: any) => {
            // Transform the notification
            const transformedNotification: Notification = {
                id: wsNotification.id,
                type: wsNotification.type as NotificationType,
                created_at: wsNotification.created_at,
                read_at: null,
                data: {
                    type: wsNotification.type,
                    ...wsNotification,
                },
            };

            setNotifications((prevNotifications) => {
                // Add new notification at the beginning
                const updatedNotifications = [
                    transformedNotification,
                    ...prevNotifications,
                ];
                // Keep only the first 5 unread notifications
                return updatedNotifications.slice(0, 5);
            });
        });

        return () => {
            channel.stopListening('notification');
        };
    }, [auth.user.id]);

    const handleMarkAsRead = (id: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read_at: new Date().toISOString() }
                    : notification,
            ),
        );
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                    <Bell size={2} />
                    {notifications.filter((notif) => !notif.read_at).length >
                        0 && (
                        <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-w-[350px] p-4">
                <H3>Notifications</H3>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItemBellDropdown
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={handleMarkAsRead}
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
