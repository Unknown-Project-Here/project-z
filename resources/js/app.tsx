import '../css/app.css';
import './bootstrap';

import { Toaster } from '@/Components/ui/sonner';
import { ThemeProvider } from '@/Providers/ThemeProvider';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import LandingPageLayout from './Layouts/LandingPageLayout';
import Layout from './Layouts/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ).then((page) => {
            // @ts-expect-error Apply default layout if page doesn't specify one
            const Page = page.default;

            // Check if the page has a specific layout defined
            if (!Page.layout) {
                // Apply LandingPageLayout for /landing route, default Layout otherwise
                Page.layout = (page: React.ReactNode) => {
                    const path = window.location.pathname;
                    if (path === '/landing') {
                        return <LandingPageLayout>{page}</LandingPageLayout>;
                    }
                    return <Layout>{page}</Layout>;
                };
            }
            return Page;
        }),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <App {...props} />
                <Toaster />
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
