import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { ProjectRole } from '@/Components/projects/invite/types';

export const useSetSelectedRole = () => {
    return (role: ProjectRole) => {
        useInviteStore.setState({ selectedRole: role });
    };
};
