import { ConfirmInviteStep } from '@/Components/projects/invite/components/ConfirmInviteStep';
import { SearchUsersStep } from '@/Components/projects/invite/components/SearchUsersStep';
import { SelectRoleStep } from '@/Components/projects/invite/components/SelectRoleStep';
import { DialogStack } from '@/Components/projects/invite/components/ui/dialog-stack';
import { useHandleStepChange } from '@/Components/projects/invite/store/hooks/useHandleStepChange';
import { useResetInvite } from '@/Components/projects/invite/store/hooks/useResetInvite';
import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { Button } from '@/Components/ui/button';
import { Project } from '@/types';
import { useEffect, useState } from 'react';

interface ProjectInviteDialogButtonProps {
    project: Project;
}

export default function ProjectInviteDialogButton({
    project,
}: ProjectInviteDialogButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedUser = useInviteStore((state) => state.selectedUser);
    const currentStep = useInviteStore((state) => state.currentStep);
    const handleStepChange = useHandleStepChange();
    const resetState = useResetInvite();

    useEffect(() => {
        if (!isOpen) {
            resetState();
        }
    }, [isOpen, resetState]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const dialogContents = [
        {
            title: 'Search Users',
            description: 'Search for users to invite to your project',
            hideNavigation: true,
            content: <SearchUsersStep project={project} />,
        },
        {
            title: 'Select Role',
            description: `Choose a role for ${selectedUser?.username}`,
            content: selectedUser && (
                <SelectRoleStep selectedUser={selectedUser} />
            ),
        },
        {
            title: 'Confirm Invitation',
            description: `Are you sure you want to invite ${selectedUser?.username}?`,
            content: (
                <ConfirmInviteStep project={project} onSuccess={handleClose} />
            ),
            hideNavigation: true,
        },
    ];

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Invite Members</Button>
            <DialogStack
                isOpen={isOpen}
                onClose={handleClose}
                dialogContents={dialogContents}
                currentStep={currentStep}
                onStepChange={handleStepChange}
            />
        </div>
    );
}
