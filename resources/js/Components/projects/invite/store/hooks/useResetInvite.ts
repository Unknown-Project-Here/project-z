import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';

export const useResetInvite = () => {
    return () => {
        useInviteStore.setState({
            searchQuery: '',
            users: [],
            selectedUser: null,
            selectedRole: 'contributor',
            currentStep: 0,
        });
    };
};
