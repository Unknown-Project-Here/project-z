import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Card } from '@/Components/ui/card';
import Heading from '@/Components/ui/typography/Heading';
import { Member } from '@/hooks/useMemberListProps';
import React from 'react';

interface MemberCardProps {
    member: Member;
}

const badgeVariant: Record<
    string,
    | 'success'
    | 'secondary'
    | 'outline'
    | 'default'
    | 'destructive'
    | null
    | undefined
> = {
    creator: 'secondary',
    admin: 'default',
    contributor: 'outline',
};

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <Card className="h-[132px] overflow-hidden transition-shadow hover:shadow-lg">
            <div className="flex h-full w-full items-center gap-4 py-6 pl-6">
                <Avatar className="size-16 border-2 border-ring">
                    <AvatarImage
                        src={member.avatar ?? undefined}
                        alt={member.username}
                    />
                    <AvatarFallback>
                        <img
                            src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${member.username}`}
                            alt={member.username}
                        />
                    </AvatarFallback>
                </Avatar>
                <div className="flex min-h-full flex-col justify-between gap-2 py-6">
                    <Heading level={5}>
                        {member.username.length > 13
                            ? member.username.substring(0, 13) + '...'
                            : member.username}
                    </Heading>
                    <Badge
                        className="w-fit text-sm"
                        variant={badgeVariant[member.role] || 'default'}
                    >
                        {member.role.charAt(0).toUpperCase() +
                            member.role.slice(1)}
                    </Badge>
                </div>
            </div>
        </Card>
    );
};
