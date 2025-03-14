import { SidebarProvider } from '@/Components/ui/sidebar';
import { Header } from '@/Layouts/components/Header';
import { AppSidebar } from '@/Layouts/components/Sidebar';
import type React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="relative flex w-full flex-1 flex-col overflow-hidden">
                    <Header />
                    <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                        <div className="flex-1">{children}</div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
