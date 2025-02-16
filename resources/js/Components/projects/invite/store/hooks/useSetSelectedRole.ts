import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';
import { ProjectRole } from '@/components/projects/invite/types';

export const useSetSelectedRole = () => {
    return (role: ProjectRole) => {
        useInviteStore.setState({ selectedRole: role });
    };
};
