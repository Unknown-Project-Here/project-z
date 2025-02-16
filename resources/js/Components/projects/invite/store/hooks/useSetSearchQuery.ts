import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';

export const useSetSearchQuery = () => {
    return (query: string) => {
        useInviteStore.setState({ searchQuery: query });
    };
};
