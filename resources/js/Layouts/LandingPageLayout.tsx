import type React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function LandingPageLayout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen w-full bg-background">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
