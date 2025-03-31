import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { StyledText } from '@/Components/ui/styled-text';
import Heading from '@/Components/ui/typography/Heading';
import { useHover } from '@/hooks/use-hover';
import { useProjectPermissions } from '@/hooks/useProjectPermissions';
import { useProjectProps } from '@/hooks/useProjectProps';
import { cn } from '@/lib/utils';
import { Member } from '@/types';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { ManageMemberSheet } from './ManageMemberSheet';

interface MemberCardProps {
    member: Member;
    isBlockListSection?: boolean;
}

const badgeVariant: Record<string, 'secondary' | 'outline' | 'default'> = {
    creator: 'secondary',
    admin: 'default',
    contributor: 'outline',
};

export const MemberCard: React.FC<MemberCardProps> = ({
    member,
    isBlockListSection,
}) => {
    const { hovered, ref } = useHover();
    const project_id = useProjectProps('id');
    const {
        canRemoveMember,
        canUpdateMemberRole,
        canUpdateToCreator,
        canRemoveFromBlocklist,
    } = useProjectPermissions();

    const handleRemoveFromBlocklist = () => {
        axios
            .post(
                route('projects.members.removeFromBlocklist', {
                    project: project_id,
                    user_id: member.id,
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
                toast.error(error.response.data.message);
            })
            .finally(() => {
                router.reload();
            });
    };

    return (
        <Card className="relative h-[132px] overflow-hidden transition-shadow hover:shadow-lg">
            <div className="flex h-full w-full items-center gap-4 py-6 pl-6">
                <Link href={`/user/${member.username}`}>
                    <Avatar
                        className={cn(
                            'size-16 border-2 border-ring',
                            hovered && 'underline',
                        )}
                        ref={ref}
                    >
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
                </Link>
                <div className="flex min-h-full flex-col justify-between gap-2 py-6">
                    <Link href={`/user/${member.username}`}>
                        <Heading
                            level={5}
                            className={cn(
                                hovered && 'underline',
                                'hover:underline',
                            )}
                        >
                            {member.username.length > 13
                                ? member.username.substring(0, 13) + '...'
                                : member.username}
                        </Heading>
                    </Link>
                    {member.role && (
                        <Badge
                            className="w-fit text-sm"
                            variant={badgeVariant[member.role] || 'default'}
                        >
                            {member.role.charAt(0).toUpperCase() +
                                member.role.slice(1)}
                        </Badge>
                    )}
                </div>
            </div>
            {!isBlockListSection && (
                <ManageMemberSheet
                    canRemoveMember={canRemoveMember}
                    canUpdateMemberRole={canUpdateMemberRole}
                    canUpdateToCreator={canUpdateToCreator}
                    managedUser={member}
                />
            )}
            {isBlockListSection && canRemoveFromBlocklist && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className="absolute right-2 top-2 px-2 hover:bg-red-500"
                            variant="ghost"
                        >
                            <X className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Remove Member From Blocklist
                            </DialogTitle>
                            <DialogDescription>
                                <StyledText
                                    text={`Are you sure you want to remove ${member.username} from the blocklist?`}
                                    highlights={[
                                        {
                                            phrase: member.username,
                                            className: 'font-bold',
                                        },
                                        {
                                            phrase: 'remove',
                                            className: 'underline',
                                        },
                                    ]}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose
                                asChild
                                onClick={handleRemoveFromBlocklist}
                            >
                                <Button variant="destructive">Remove</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </Card>
    );
};
