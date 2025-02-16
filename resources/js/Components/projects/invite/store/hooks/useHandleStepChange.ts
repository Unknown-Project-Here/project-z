import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';

export const useHandleStepChange = () => {
    return (step: number) => {
        if (step === 0) {
            useInviteStore.setState({
                selectedUser: null,
                selectedRole: 'contributor',
            });
        }
        useInviteStore.setState({ currentStep: step });
    };
};
