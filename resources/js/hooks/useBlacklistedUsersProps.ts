import { usePageProps } from '@/hooks/usePageProps';
import { Member, PaginationMeta } from '@/types';

type BlacklistedUsersProps = {
    blacklistedUsers: Member[];
    meta: PaginationMeta;
};

export function useBlacklistedUsersProps(): BlacklistedUsersProps {
    const { props } = usePageProps();
    const blacklistedUsers = props.blocklist as PaginationMeta & {
        data: Member[];
    };

    return {
        blacklistedUsers: blacklistedUsers.data,
        meta: {
            current_page: blacklistedUsers.current_page,
            first_page_url: blacklistedUsers.first_page_url,
            from: blacklistedUsers.from,
            last_page: blacklistedUsers.last_page,
            last_page_url: blacklistedUsers.last_page_url,
            links: blacklistedUsers.links,
            next_page_url: blacklistedUsers.next_page_url,
            path: blacklistedUsers.path,
            per_page: blacklistedUsers.per_page,
            prev_page_url: blacklistedUsers.prev_page_url,
            to: blacklistedUsers.to,
            total: blacklistedUsers.total,
        },
    };
}
