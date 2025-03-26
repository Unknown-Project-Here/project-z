import { usePageProps } from '@/hooks/usePageProps';
import { PaginationMeta, ProjectIssue } from '@/types';

export type AssignedIssuesProps = {
    issues: ProjectIssue[];
    meta: PaginationMeta;
};

export function useFullViewAssignedIssuesProps(): AssignedIssuesProps {
    const { props } = usePageProps();
    const issues = props.issues as PaginationMeta & {
        data: ProjectIssue[];
    };

    return {
        issues: issues.data,
        meta: {
            current_page: issues.current_page,
            first_page_url: issues.first_page_url,
            from: issues.from,
            last_page: issues.last_page,
            last_page_url: issues.last_page_url,
            links: issues.links,
            next_page_url: issues.next_page_url,
            path: issues.path,
            per_page: issues.per_page,
            prev_page_url: issues.prev_page_url,
            to: issues.to,
            total: issues.total,
        },
    };
}
