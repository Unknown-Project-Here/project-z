import { useHandleStepChange } from '@/Components/projects/invite/store/hooks/useHandleStepChange';
import { useSubmitInvite } from '@/Components/projects/invite/store/hooks/useSubmitInvite';
import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Project } from '@/types';

interface ConfirmInviteStepProps {
    project: Project;
    onSuccess?: () => void;
}

export function ConfirmInviteStep({
    project,
    onSuccess,
}: ConfirmInviteStepProps) {
    const selectedUser = useInviteStore((state) => state.selectedUser);
    const isInviting = useInviteStore((state) => state.isInviting);
    const handleStepChange = useHandleStepChange();
    const submitInvite = useSubmitInvite();

    if (!selectedUser) return null;

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                <Avatar className="size-24">
                    <AvatarImage
                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${selectedUser.username}`}
                        alt={selectedUser.username}
                    />
                    <AvatarFallback>{selectedUser.username}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={() => handleStepChange(1)}
                    className="max-w-fit"
                >
                    Previous
                </Button>
                <Button
                    onClick={() => submitInvite(project, onSuccess)}
                    className="max-w-fit"
                    disabled={isInviting}
                >
                    {isInviting ? 'Adding...' : `Add ${selectedUser.username}`}
                </Button>
            </div>
        </>
    );
}
