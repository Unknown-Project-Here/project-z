import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { useHandleStepChange } from '@/components/projects/invite/store/hooks/useHandleStepChange';
import { useSubmitInvite } from '@/components/projects/invite/store/hooks/useSubmitInvite';
import { useInviteStore } from '@/components/projects/invite/store/use-invite-store';

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
