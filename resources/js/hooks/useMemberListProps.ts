import { usePageProps } from '@/hooks/usePageProps';
import { PaginationMeta } from '@/types';

export type Member = {
    id: number;
    username: string;
    avatar: string | null;
    role: string;
};

type MemberListProps = {
    members: Member[];
    meta: PaginationMeta;
};

export function useMemberListProps(): MemberListProps {
    const { props } = usePageProps();
    const members = props.members as PaginationMeta & {
        data: Member[];
    };

    return {
        members: members.data,
        meta: {
            current_page: members.current_page,
            first_page_url: members.first_page_url,
            from: members.from,
            last_page: members.last_page,
            last_page_url: members.last_page_url,
            links: members.links,
            next_page_url: members.next_page_url,
            path: members.path,
            per_page: members.per_page,
            prev_page_url: members.prev_page_url,
            to: members.to,
            total: members.total,
        },
    };
}
