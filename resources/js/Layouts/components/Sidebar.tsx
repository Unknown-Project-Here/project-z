import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Settings, UserCircle } from 'lucide-react';

export function AppSidebar() {
    const { auth } = usePage().props;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <LayoutDashboard className="mr-2 h-5 w-5" />
                                Project Hub
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/projects">
                                <LayoutDashboard className="mr-2 h-5 w-5" />
                                Projects
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/profile">
                                <UserCircle className="mr-2 h-5 w-5" />
                                Profile
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/settings/account">
                                <Settings className="mr-2 h-5 w-5" />
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex cursor-pointer items-center rounded-md p-2">
                                <Avatar>
                                    <AvatarImage
                                        src={auth.user.avatar || ''}
                                        alt={auth.user.name}
                                    />
                                    <AvatarFallback>
                                        {auth.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="ml-2">{auth.user.name}</span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenu>
                            <DropdownMenuItem asChild>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/logout" method="post">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenu>
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
