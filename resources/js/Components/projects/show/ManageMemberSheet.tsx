import { ConfirmRoleUpdateDialog } from '@/Components/projects/show/Members/components/ConfirmRoleUpdateDialog';
import { ManagerToggleButton } from '@/Components/projects/show/Members/components/ManagerToggleButton';
import { MemberSheetHeader } from '@/Components/projects/show/Members/components/MemberSheetHeader';
import { RemoveMemberDialog } from '@/Components/projects/show/Members/components/RemoveMemberDialog';
import { RoleSelector } from '@/Components/projects/show/Members/components/RoleSelector';
import { useManageMember } from '@/Components/projects/show/Members/hooks/useManageMember';
import {
    getAllowedRoleOptions,
    Role,
    sameOrHigherRole,
} from '@/Components/projects/show/Members/utils/manageMemberUtils';
import { Button } from '@/Components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
} from '@/Components/ui/sheet';
import { Member } from '@/hooks/useMemberListProps';
import { useProjectPermissions } from '@/hooks/useProjectPermissions';
import { useProjectProps } from '@/hooks/useProjectProps';
import { useUser } from '@/hooks/useUser';

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

    const {
        selectedRole,
        isRoleDialogOpen,
        setIsRoleDialogOpen,
        handleRoleSelect,
        handleRoleConfirm,
        handleRemoveMember,
    } = useManageMember(managedUser, project_id);

    if (!canRemoveMember && !canUpdateMemberRole) return null;
    if (user?.id === managedUser.id) return null;
    if (sameOrHigherRole(userRole as Role, managedUser.role as Role))
        return null;

    const allowedRoles = getAllowedRoleOptions({
        currentRole: managedUser.role as Role,
        canUpdateMemberRole,
        canUpdateToCreator,
    });

    return (
        <Sheet>
            <ManagerToggleButton />
            <SheetContent className="space-y-4">
                <MemberSheetHeader username={managedUser.username} />

                <RoleSelector
                    currentRole={managedUser.role as Role}
                    allowedRoles={allowedRoles}
                    onRoleSelect={handleRoleSelect}
                />

                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    {canRemoveMember && (
                        <RemoveMemberDialog
                            username={managedUser.username}
                            onRemoveMember={handleRemoveMember}
                        />
                    )}
                </SheetFooter>
            </SheetContent>

            {selectedRole && (
                <ConfirmRoleUpdateDialog
                    username={managedUser.username}
                    selectedRole={selectedRole}
                    isOpen={isRoleDialogOpen}
                    onOpenChange={setIsRoleDialogOpen}
                    onConfirm={handleRoleConfirm}
                />
            )}
        </Sheet>
    );
}
