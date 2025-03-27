import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Role } from '../utils/manageMemberUtils';

type ConfirmRoleUpdateDialogProps = {
    username: string;
    selectedRole: Role;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

export function ConfirmRoleUpdateDialog({
    username,
    selectedRole,
    isOpen,
    onOpenChange,
    onConfirm,
}: ConfirmRoleUpdateDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Confirm Role Update</DialogTitle>
                <DialogDescription>
                    Are you sure you want to update{' '}
                    <span className="font-bold">{username}</span>'s role to{' '}
                    <span className="font-bold">
                        {selectedRole.charAt(0).toUpperCase() +
                            selectedRole.slice(1)}
                    </span>
                    ?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={onConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
