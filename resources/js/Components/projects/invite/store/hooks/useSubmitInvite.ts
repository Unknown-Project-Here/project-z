import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { Project } from '@/types';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useSubmitInvite = () => {
    return async (project: Project, onSuccess?: () => void) => {
        const { selectedUser, selectedRole } = useInviteStore.getState();
        if (!selectedUser) return;

        useInviteStore.setState({ isInviting: true });
        try {
            const response = await axios.post(
                route('projects.invite', { project: project.id }),
                {
                    invitee_id: selectedUser.user_id,
                    role: selectedRole,
                },
            );

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset state after successful invite
                useInviteStore.setState({
                    searchQuery: '',
                    users: [],
                    selectedUser: null,
                    selectedRole: 'contributor',
                    currentStep: 0,
                });
                onSuccess?.();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const message =
                axiosError.response?.data?.message || 'Failed to invite user';
            toast.error(message);
        } finally {
            useInviteStore.setState({ isInviting: false });
        }
    };
};
