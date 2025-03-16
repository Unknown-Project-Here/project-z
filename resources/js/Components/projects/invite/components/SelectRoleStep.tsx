import { useSetSelectedRole } from '@/Components/projects/invite/store/hooks/useSetSelectedRole';
import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { SearchResultUser } from '@/Components/projects/invite/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';

interface SelectRoleStepProps {
    selectedUser: SearchResultUser;
}

const roleOptions = [
    {
        label: 'Contributor',
        value: 'contributor',
    },
    {
        label: 'Admin',
        value: 'admin',
    },
    {
        label: 'Creator',
        value: 'creator',
    },
];

export function SelectRoleStep({ selectedUser }: SelectRoleStepProps) {
    const selectedRole = useInviteStore((state) => state.selectedRole);
    const setSelectedRole = useSetSelectedRole();

    return (
        <>
            <div className="flex items-center space-x-2 rounded-md p-2 ring-2 ring-muted-foreground">
                <Avatar>
                    <AvatarImage
                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${selectedUser.username}`}
                        alt={selectedUser.username}
                    />
                    <AvatarFallback>{selectedUser.username}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{selectedUser.username}</p>
                </div>
            </div>

            <div className="pb-4 pt-6">
                <RadioGroup
                    value={selectedRole}
                    onValueChange={setSelectedRole}
                    className="space-y-4"
                >
                    {roleOptions.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem
                                value={option.value}
                                id={option.value}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    );
}
