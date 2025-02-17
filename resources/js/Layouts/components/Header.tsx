import { ThemeToggle } from '@/components/ThemeToggle';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { usePageProps } from '@/hooks/usePageProps';
import NotificationBellDropdown from '@/Layouts/components/notifications/NotificationBellDropdown';
import { Notification } from '@/Layouts/components/notifications/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export function Header() {
    const { open } = useSidebar();
    const { url } = usePage();
    const { user } = usePage().props.auth;
    const { notifications } = usePageProps<{ notifications: Notification[] }>()
        .props;

    const getBreadcrumbItems = () => {
        const path = url.split('?')[0];
        const segments = path.split('/').filter(Boolean);
        const items = [];

        // Add Home link for all routes except root
        if (path !== '/') {
            items.push(
                <BreadcrumbItem key="home">
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>,
            );
        } else {
            items.push(
                <BreadcrumbItem key="home">
                    <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>,
            );
            return items;
        }

        // Build nested breadcrumb items
        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Check if segment is a number (likely an ID)
            const isId = !isNaN(Number(segment));

            items.push(
                <BreadcrumbItem key={currentPath}>
                    {index === segments.length - 1 || isId ? (
                        <BreadcrumbPage>
                            {isId
                                ? `${segment}`
                                : segment.charAt(0).toUpperCase() +
                                  segment.slice(1)}
                        </BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={currentPath}>
                                {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                            </Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>,
            );
        });

        return items;
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {getBreadcrumbItems().map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                                {index < getBreadcrumbItems().length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
                {!open && (
                    <>
                        <Button asChild className="min-w-[100px]">
                            <Link href="/login" className="btn btn-primary">
                                Login
                            </Link>
                        </Button>
                        <Button
                            asChild
                            className="min-w-[100px]"
                            variant="secondary"
                        >
                            <Link
                                href="/register"
                                className="btn btn-secondary"
                            >
                                Register
                            </Link>
                        </Button>
                    </>
                )}
                <div className="flex items-center gap-2">
                    {user && (
                        <NotificationBellDropdown
                            notifications={notifications}
                        />
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
