import { MemberCard } from '@/Components/projects/show/MemberCard';
import { ReusableSearch } from '@/Components/projects/show/ReusableSearch';
import { Button } from '@/Components/ui/button';
import Pagination from '@/Components/ui/pagination';
import { Spacer } from '@/Components/ui/spacer';
import Heading from '@/Components/ui/typography/Heading';
import { useBlacklistedUsersProps } from '@/hooks/useBlacklistedUsersProps';
import { useProjectProps } from '@/hooks/useProjectProps';
import { ArrowLeft } from 'lucide-react';

export function BlockList() {
    const { blacklistedUsers, meta } = useBlacklistedUsersProps();
    const project_id = useProjectProps('id');

    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <Heading level={3}>Block List</Heading>
                    <Button onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 size-4" />
                        Back
                    </Button>
                </div>
                <p>
                    The block list is a list of users who have been blocked from
                    joining the project. Users in the blocklist cannot be added
                    to this project.
                </p>

                <Spacer size="1" />

                <ReusableSearch
                    routeName="projects.show"
                    routeParams={{
                        project: project_id,
                        activeTab: 'members',
                        activeSection: 'blocklist',
                    }}
                />

                <Spacer size="1" />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blacklistedUsers.map((member) => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            isBlockListSection
                        />
                    ))}
                </div>
            </div>
            <Spacer size="6" />
            <Pagination pagination={meta} />
        </>
    );
}
