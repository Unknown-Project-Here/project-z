import { Button } from '@/Components/ui/button';
import Pagination from '@/Components/ui/pagination';
import Heading from '@/Components/ui/typography/Heading';
import { useMemberListProps } from '@/hooks/useMemberListProps';
import { useProjectPermissions } from '@/hooks/useProjectPermissions';
import { useProjectProps } from '@/hooks/useProjectProps';
import { Link, router } from '@inertiajs/react';
import { PlusIcon, Users } from 'lucide-react';
import { MemberCard } from './MemberCard';

export function MembersList() {
    const project = useProjectProps();
    const { canManageRequests, canInviteToProject } = useProjectPermissions();
    const { members, meta } = useMemberListProps();

    const handleAddMember = () => {
        router.visit(
            route('projects.show', {
                project: project.id,
                activeTab: 'members',
                activeSection: 'invite',
            }),
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div>
                    <Heading level={3}>Team Members</Heading>
                    <p className="text-muted-foreground">
                        Manage and view all team members working on this
                        project.
                    </p>
                </div>
                <div className="flex gap-2">
                    {canManageRequests && (
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            asChild
                        >
                            <Link
                                href={route('projects.show', {
                                    project: project.id,
                                    activeTab: 'members',
                                    activeSection: 'view-applications',
                                })}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                View Applications
                            </Link>
                        </Button>
                    )}
                    {canInviteToProject && (
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleAddMember}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Member
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
            </div>
            <Pagination
                pagination={meta}
                onPageChange={(page) => {
                    router.visit(
                        route('projects.show', {
                            project: project.id,
                            activeTab: 'members',
                            page,
                        }),
                    );
                }}
            />
        </div>
    );
}
