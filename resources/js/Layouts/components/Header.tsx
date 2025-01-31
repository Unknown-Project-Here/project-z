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
import { Link } from '@inertiajs/react';

export function Header() {
    const { open } = useSidebar();
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Current Page</BreadcrumbPage>
                        </BreadcrumbItem>
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
                <ThemeToggle />
            </div>
        </header>
    );
}
