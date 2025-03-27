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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { Member } from '@/hooks/useMemberListProps';
import { useProjectPermissions } from '@/hooks/useProjectPermissions';
import { useProjectProps } from '@/hooks/useProjectProps';
import { useUser } from '@/hooks/useUser';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { CogIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    getAllowedRoleOptions,
    Role,
    sameOrHigherRole,
} from './utils/manageMemberUtils';

export function ManageMemberSheet({
    canRemoveMember,
    canUpdateMemberRole,
    canUpdateToCreator,
    managedUser,
}: {
    canRemoveMember: boolean;
    canUpdateMemberRole: boolean;
    canUpdateToCreator: boolean;
    managedUser: Member;
}) {
    const user = useUser();
    const project_id = useProjectProps('id');
    const { userRole } = useProjectPermissions();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role as Role);
        setIsRoleDialogOpen(true);
    };

    const handleRoleConfirm = () => {
        axios
            .post(
                route('projects.members.updateRole', {
                    project: project_id,
                    user_id: managedUser.id,
                    role: selectedRole,
                }),
            )
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(
                        'An error occurred while updating the member role',
                    );
                }
            })
            .finally(() => {
                setIsRoleDialogOpen(false);
                setSelectedRole(null);
                router.reload();
            });
    };

    if (!canRemoveMember && !canUpdateMemberRole) return null;
    if (user?.id === managedUser.id) return null;
    if (sameOrHigherRole(userRole as Role, managedUser.role as Role))
        return null;

    const allowedRoles = getAllowedRoleOptions({
        currentRole: managedUser.role as Role,
        canUpdateMemberRole,
        canUpdateToCreator,
    });

    const handleRemoveMember = () => {
        axios
            .delete(
                route('projects.members.removeMember', {
                    project: project_id,
                    user: managedUser.id,
                }),
            )
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('An error occurred while removing the member');
                }
            })
            .finally(() => {
                router.reload();
            });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-1 top-1"
                >
                    <CogIcon className="size-2" />
                </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle className="font-normal">
                        Manage{' '}
                        <span className="font-bold">
                            {`${managedUser.username}`}
                        </span>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    <p>Current role: {managedUser.role}</p>

                    <Select onValueChange={handleRoleSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder="Update to role" />
                        </SelectTrigger>
                        <SelectContent>
                            {allowedRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                    {role.charAt(0).toUpperCase() +
                                        role.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    {canRemoveMember && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    Remove Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Remove Member</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to remove{' '}
                                    <span className="font-bold">
                                        {`${managedUser.username}`}
                                    </span>{' '}
                                    from the project?
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose
                                        asChild
                                        onClick={handleRemoveMember}
                                    >
                                        <Button variant="destructive">
                                            Remove
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </SheetFooter>
            </SheetContent>
            {selectedRole && (
                <Dialog
                    open={isRoleDialogOpen}
                    onOpenChange={setIsRoleDialogOpen}
                >
                    <DialogContent>
                        <DialogTitle>Confirm Role Update</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to update{' '}
                            <span className="font-bold">
                                {managedUser.username}
                            </span>
                            's role to{' '}
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
                                    onClick={() => setSelectedRole(null)}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button onClick={handleRoleConfirm}>Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </Sheet>
    );
}
