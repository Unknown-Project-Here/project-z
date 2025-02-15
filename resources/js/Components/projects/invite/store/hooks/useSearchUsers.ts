import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';
import { Project } from '@/types';
import axios from 'axios';

export const useSearchUsers = () => {
    return async (project: Project, searchQuery: string) => {
        if (searchQuery.length < 2) {
            useInviteStore.setState({ users: [] });
            return;
        }

        useInviteStore.setState({ isSearching: true });
        try {
            const response = await axios.get(
                route('projects.search-users', {
                    project: project.id,
                    search: searchQuery,
                }),
            );
            useInviteStore.setState({ users: response.data.users });
        } catch (error) {
            console.error('Failed to search users:', error);
            useInviteStore.setState({ users: [] });
        } finally {
            useInviteStore.setState({ isSearching: false });
        }
    };
};
