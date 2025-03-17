import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import H3 from '@/Components/ui/typography/H3';
import { usePageProps } from '@/hooks/usePageProps';
import NotificationItemPage from '@/Layouts/components/notifications/NotificationItemPage';
import { useNotificationStore } from '@/Layouts/components/notifications/store/notifications';
import { Notification } from '@/Layouts/components/notifications/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Notifications() {
    const { allNotifications: initialNotifications, shouldShowMarkAllAsRead } =
        usePageProps<{
            allNotifications: Notification[];
            shouldShowMarkAllAsRead: boolean;
        }>().props;

    const { user } = usePage().props.auth;
    const {
        allNotifications,
        setAllNotifications,
        markAllAsRead,
        subscribeToNotifications,
    } = useNotificationStore();

    useEffect(() => {
        setAllNotifications(initialNotifications);
    }, [initialNotifications, setAllNotifications]);

    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToNotifications(user.id);
        return () => unsubscribe();
    }, [user, subscribeToNotifications]);

    if (!user) return router.visit(route('login'));

    return (
        <>
            <Head title="Notifications" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <H3>Notifications</H3>
                    {shouldShowMarkAllAsRead && (
                        <Button variant="outline" onClick={markAllAsRead}>
                            Mark all as read
                        </Button>
                    )}
                </div>
                {allNotifications.length > 0 ? (
                    allNotifications.map((notification) => (
                        <NotificationItemPage
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-4 text-center text-gray-500">
                            No new notifications
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
