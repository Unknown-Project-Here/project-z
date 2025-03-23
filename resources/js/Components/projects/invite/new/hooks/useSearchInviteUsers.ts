import { usePageProps } from '@/hooks/usePageProps';
import { PaginationMeta } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

type User = {
    user_id: number;
    username: string;
    avatar?: string;
};

type UsersResult = {
    data: User[];
    meta: PaginationMeta;
};

const DEFAULT_PAGINATION: PaginationMeta = {
    current_page: 1,
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 20,
    prev_page_url: null,
    to: 0,
    total: 0,
};

export function useSearchInviteUsers(
    projectId: number,
    search: string,
    page: number = 1,
): UsersResult {
    const { props } = usePageProps();
    const users = props.users as
        | (PaginationMeta & { data: User[] })
        | undefined;

    useEffect(() => {
        if (search.length >= 2 && search.length <= 16) {
            router.get(
                route('projects.show', {
                    project: projectId,
                    activeTab: 'members',
                    activeSection: 'invite',
                }),
                { search, page },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['users'],
                },
            );
        }
    }, [search, page, projectId]);

    if (!users) {
        return {
            data: [],
            meta: DEFAULT_PAGINATION,
        };
    }

    const { data, ...meta } = users;

    return {
        data: data || [],
        meta: meta as PaginationMeta,
    };
}
