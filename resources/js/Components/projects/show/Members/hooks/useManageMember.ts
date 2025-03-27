/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from '@/hooks/useMemberListProps';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    removeMember,
    updateMemberRole,
} from '../services/manageMemberService';
import { Role } from '../utils/manageMemberUtils';

type ErrorWithResponse = {
    response?: {
        data?: {
            message?: string;
        };
    };
};

export const useManageMember = (managedUser: Member, project_id: number) => {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role as Role);
        setIsRoleDialogOpen(true);
    };

    const handleRoleConfirm = async () => {
        try {
            const response = await updateMemberRole(
                project_id,
                managedUser.id,
                selectedRole as Role,
            );
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error: unknown) {
            const err = error as ErrorWithResponse;
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('An error occurred while updating the member role');
            }
        } finally {
            setIsRoleDialogOpen(false);
            setSelectedRole(null);
            router.reload();
        }
    };

    const handleRemoveMember = async () => {
        try {
            const response = await removeMember(project_id, managedUser.id);
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error: unknown) {
            const err = error as ErrorWithResponse;
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('An error occurred while removing the member');
            }
        } finally {
            router.reload();
        }
    };

    return {
        selectedRole,
        isRoleDialogOpen,
        setIsRoleDialogOpen,
        handleRoleSelect,
        handleRoleConfirm,
        handleRemoveMember,
    };
};
