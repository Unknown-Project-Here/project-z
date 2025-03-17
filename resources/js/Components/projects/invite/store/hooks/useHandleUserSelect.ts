import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { SearchResultUser } from '@/Components/projects/invite/types';

export const useHandleUserSelect = () => {
    return (user: SearchResultUser) => {
        useInviteStore.setState({
            selectedUser: user,
            selectedRole: 'contributor',
            currentStep: 1,
        });
    };
};
