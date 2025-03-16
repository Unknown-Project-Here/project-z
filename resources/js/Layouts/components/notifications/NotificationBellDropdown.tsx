import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import H3 from '@/Components/ui/typography/H3';
import NotificationItemBellDropdown from '@/Layouts/components/notifications/NotificationItemBellDropdown';
import { useNotificationStore } from '@/Layouts/components/notifications/store/notifications';
import { Notification } from '@/Layouts/components/notifications/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotificationBellDropdown({
    notifications: initialNotifications,
}: {
    notifications: Notification[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage().props as { auth: { user: { id: number } } };
    const { notifications, setNotifications, subscribeToNotifications } =
        useNotificationStore();

    useEffect(() => {
        setNotifications(initialNotifications);
    }, [initialNotifications, setNotifications]);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications(auth.user.id);
        return () => unsubscribe();
    }, [auth.user.id, subscribeToNotifications]);

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
