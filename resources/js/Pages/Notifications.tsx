import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import H3 from '@/components/ui/typography/H3';
import { usePageProps } from '@/hooks/usePageProps';
import NotificationItemPage from '@/Layouts/components/notifications/NotificationItemPage';
import { Notification } from '@/Layouts/components/notifications/types';
import { Head, router, usePage } from '@inertiajs/react';

export default function Notifications() {
    const { notifications } = usePageProps<{
        notifications: Notification[];
    }>().props;

    const { user } = usePage().props.auth;

    if (!user) return router.visit(route('login'));

    return (
        <>
            <Head title="Notifications" />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <H3>Notifications</H3>
                    <Button variant="outline">Mark all as read</Button>
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
