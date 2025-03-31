import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import React from 'react';
import { MemberSimple } from './types/IssueFormTypes';

interface AssigneeSelectProps {
    value: string;
    members: MemberSimple[];
    onValueChange: (value: string) => void;
}

const AssigneeSelect: React.FC<AssigneeSelectProps> = ({
    value,
    members,
    onValueChange,
}) => (
    <div className="space-y-2">
        <Label htmlFor="assignee" className="text-sm font-medium">
            Assignee
        </Label>
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger
                id="assignee"
                className="border-input bg-background focus:ring-ring/20"
            >
                <SelectValue placeholder="Assign to team member" />
            </SelectTrigger>
            <SelectContent>
                {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-ring/10">
                                <AvatarImage
                                    src={member.avatar}
                                    alt={member.name}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    {member.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {member.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default React.memo(AssigneeSelect);
