import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Role } from '../utils/manageMemberUtils';

type RoleSelectorProps = {
    currentRole: string;
    allowedRoles: Role[];
    onRoleSelect: (role: string) => void;
};

export function RoleSelector({
    currentRole,
    allowedRoles,
    onRoleSelect,
}: RoleSelectorProps) {
    return (
        <div className="flex flex-col gap-4">
            <p>Current role: {currentRole}</p>
            <Select onValueChange={onRoleSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Update to role" />
                </SelectTrigger>
                <SelectContent>
                    {allowedRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
