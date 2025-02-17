import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import H3 from '@/components/ui/typography/H3';
import { usePageProps } from '@/hooks/usePageProps';
import NotificationItemPage from '@/Layouts/components/notifications/NotificationItemPage';
import { Notification } from '@/Layouts/components/notifications/types';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';

export default function Notifications() {
    const { notifications, shouldShowMarkAllAsRead } = usePageProps<{
        notifications: Notification[];
        shouldShowMarkAllAsRead: boolean;
    }>().props;

    const { user } = usePage().props.auth;

    if (!user) return router.visit(route('login'));

    const handleMarkAllAsRead = () => {
        axios
            .post(route('notifications.markAllAsRead'))
            .then(() => {
                router.visit(route('notifications.index'), {
                    only: ['notifications', 'shouldShowMarkAllAsRead'],
                });
            })
            .catch(() => {
                toast.error('Error marking notifications as read.');
            })
            .finally(() => {
                toast.success('All notifications marked as read');
            });
    };

    return (
        <>
            <Head title="Notifications" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <H3>Notifications</H3>
                    {shouldShowMarkAllAsRead && (
                        <Button variant="outline" onClick={handleMarkAllAsRead}>
                            Mark all as read
                        </Button>
                    )}
                </div>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
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
