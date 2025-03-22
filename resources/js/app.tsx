import '../css/app.css';
import './bootstrap';

import { Toaster } from '@/Components/ui/sonner';
import { ThemeProvider } from '@/Providers/ThemeProvider';
import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Layout from './Layouts/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ).then((page) => {
            // @ts-expect-error Apply default layout if page doesn't specify one
            const Page = page.default;
            Page.layout =
                Page.layout ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ((page: any) => <Layout>{page}</Layout>);
            return Page;
        }),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
                <Toaster />
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
