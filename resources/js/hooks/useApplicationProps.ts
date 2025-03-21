import { usePageProps } from '@/hooks/usePageProps';
import { PaginationMeta } from '@/types';

export interface Application {
    id: number;
    project_id: number;
    created_at: string;
    user: {
        id: number;
        username: string;
        avatar: string;
    };
}

interface ApplicationsResult {
    data: Application[];
    meta: PaginationMeta;
}

export function useApplicationProps(): ApplicationsResult {
    const { props } = usePageProps();
    const applications = props.applications as PaginationMeta & {
        data: Application[];
    };

    return {
        data: applications.data,
        meta: {
            current_page: applications.current_page,
            first_page_url: applications.first_page_url,
            from: applications.from,
            last_page: applications.last_page,
            last_page_url: applications.last_page_url,
            links: applications.links,
            next_page_url: applications.next_page_url,
            path: applications.path,
            per_page: applications.per_page,
            prev_page_url: applications.prev_page_url,
            to: applications.to,
            total: applications.total,
        },
    };
}