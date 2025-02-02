import { Page, PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

export function usePageProps<
    T extends Record<string, unknown> = Record<string, never>,
>() {
    return usePage<PageProps & T>();
}

// Type helper for components
export type InertiaPageProps<
    T extends Record<string, unknown> = Record<string, never>,
> = Page<PageProps & T>['props'];
