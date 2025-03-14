import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/Components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
    FeatherIcon,
    FolderGit2,
    LayoutDashboard,
    Settings,
    UserCog,
} from 'lucide-react';
import { NavItems } from '../config/Site';

// update this with new iconto use the NavItems from the config/Site.tsx file
const iconComponents = {
    FolderGit2,
    LayoutDashboard,
    UserCog,
    Settings,
};

export function AppSidebar() {
    const { auth } = usePage().props;
    const { url } = usePage();

    const path = url.split('?')[0];

    const isActiveLink = (href: string) => {
        // Extract the path from the full URL if it contains http/https
        const currentPath = path.replace(/^(?:https?:\/\/[^\/]+)?/, '');

        // Handle root path separately
        if (href === '/') {
            return currentPath === href;
        }

        // Check if the current path starts with the href
        // This will match both exact paths and nested routes
        return currentPath.startsWith(href);
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <Link
                        href="/"
                        className="flex items-center justify-center py-1.5 text-3xl"
                    >
                        <FeatherIcon className="mr-2 h-8 w-8" />
                        Project Hub
                    </Link>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="px-4 py-4">
                    {NavItems.map((item) => {
                        const IconComponent =
                            iconComponents[
                                item.icon as keyof typeof iconComponents
                            ];
                        const isActive = isActiveLink(item.href);

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    className={`my-1 ${isActive ? 'bg-primary hover:bg-primary' : ''}`}
                                >
                                    <Link href={item.href}>
                                        <IconComponent
                                            className={`mr-2 h-5 w-5 ${isActive ? 'text-white' : ''}`}
                                        />
                                        {item.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex cursor-pointer items-center rounded-md p-2">
                                <Avatar className="bg-primary">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${auth.user.username}`}
                                        alt={auth.user.username}
                                    />
                                    <AvatarFallback>
                                        {auth.user.username.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="ml-2">
                                    {auth.user.username}
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/logout" method="post">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex min-w-full justify-evenly gap-4">
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
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
