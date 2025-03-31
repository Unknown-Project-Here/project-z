import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

type RemoveMemberDialogProps = {
    username: string;
    onRemoveMember: () => void;
};

export function RemoveMemberDialog({
    username,
    onRemoveMember,
}: RemoveMemberDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Remove Member</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Remove Member</DialogTitle>
                <DialogDescription>
                    Are you sure you want to remove{' '}
                    <span className="font-bold">{username}</span> from the
                    project?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild onClick={onRemoveMember}>
                        <Button variant="destructive">Remove</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
