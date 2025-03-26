import { IssueCard } from '@/Components/projects/show/IssueCard';
import Pagination from '@/Components/ui/pagination';
import { useFullViewAssignedIssuesProps } from '@/hooks/useFullViewAssignedIssuesProps';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import React from 'react';

const AssignedIssuesFullView: React.FC = () => {
    const { issues: data, meta } = useFullViewAssignedIssuesProps();
    const { id: project_id } = useProjectProps(['id']);
    if (data.length === 0) {
        return (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No issues assigned to you
            </div>
        );
    }

    return (
        <div className="space-y-6 @container">
            <div className="grid gap-4 @[600px]:grid-cols-2 @[800px]:grid-cols-3">
                {data.map((issue) => (
                    <IssueCard key={issue.issue_id} issue={issue} />
                ))}
            </div>
            <Pagination
                pagination={meta}
                className="mt-4"
                perPageOptions={[12, 24, 36, 48]}
                onPageChange={(page: number) => {
                    router.visit(
                        route('projects.show', {
                            project: project_id,
                            activeTab: 'issues',
                            page: page,
                        }),
                    );
                }}
            />
        </div>
    );
};

export default React.memo(AssignedIssuesFullView);
