import { Button } from '@/Components/ui/button';
import { Users } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import MemberCard, { MemberType } from './MemberCard';

import { useProjectProps } from '@/hooks/useProjectProps';
import { Link } from '@inertiajs/react';
function MembersList() {
    const project = useProjectProps();
    const members: MemberType[] = useMemo(
        () => [
            {
                id: '1',
                name: 'Alex Johnson',
                role: 'Project Lead',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'alex@example.com',
                github: 'alexj',
                assignedIssues: 5,
                status: 'active',
            },
            {
                id: '2',
                name: 'Sarah Miller',
                role: 'Frontend Developer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'sarah@example.com',
                github: 'sarahm',
                assignedIssues: 7,
                status: 'active',
            },
            {
                id: '3',
                name: 'David Chen',
                role: 'Backend Developer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'david@example.com',
                github: 'davidc',
                assignedIssues: 4,
                status: 'active',
            },
            {
                id: '4',
                name: 'Emma Wilson',
                role: 'UX Designer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'emma@example.com',
                github: 'emmaw',
                assignedIssues: 2,
                status: 'away',
            },
            {
                id: '5',
                name: 'James Taylor',
                role: 'DevOps Engineer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'james@example.com',
                github: 'jamest',
                assignedIssues: 3,
                status: 'active',
            },
            {
                id: '6',
                name: 'Olivia Brown',
                role: 'QA Engineer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'olivia@example.com',
                github: 'oliviab',
                assignedIssues: 6,
                status: 'active',
            },
            {
                id: '7',
                name: 'Michael Davis',
                role: 'Full Stack Developer',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'michael@example.com',
                github: 'michaeld',
                assignedIssues: 8,
                status: 'away',
            },
            {
                id: '8',
                name: 'Sophia Martinez',
                role: 'Product Manager',
                avatar: '/placeholder.svg?height=80&width=80',
                email: 'sophia@example.com',
                github: 'sophiam',
                assignedIssues: 0,
                status: 'inactive',
            },
        ],
        [],
    );

    const handleAddMember = useCallback(() => {
        console.log('Add member clicked');
    }, []);

    const handleMessageMember = useCallback((memberId: string) => {
        console.log(`Message member ${memberId}`);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">
                        Team Members
                    </h2>
                    <p className="text-muted-foreground">
                        Manage and view all team members working on this
                        project.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        asChild
                    >
                        <Link
                            href={route('projects.applications.index', {
                                project: project.id,
                            })}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            View Applications
                        </Link>
                    </Button>
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleAddMember}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Add Member
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        onMessageClick={handleMessageMember}
                    />
                ))}
            </div>
        </div>
    );
}

export default React.memo(MembersList);
