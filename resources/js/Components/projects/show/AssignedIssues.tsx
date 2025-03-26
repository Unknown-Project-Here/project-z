import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { useAssignedIssuesProps } from '@/hooks/useAssignedIssuesProps';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import React, { useCallback, useMemo } from 'react';
import { IssueCard } from './IssueCard';

interface AssignedIssuesProps {
    fullView?: boolean;
}

export function AssignedIssues({ fullView = false }: AssignedIssuesProps) {
    const issues = useAssignedIssuesProps();
    const { id: project_id, total_assigned_issues } = useProjectProps([
        'id',
        'total_assigned_issues',
    ]);

    const displayIssues = useMemo(
        () => (fullView ? issues : issues.slice(0, 5)),
        [fullView, issues],
    );

    const handleViewAll = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            router.visit(
                route('projects.show', {
                    project: project_id,
                    activeTab: 'issues',
                }),
            );
        },
        [project_id],
    );

    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <Card className="relative h-full border-0 bg-transparent shadow-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-xl font-bold">
                            <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                                Assigned Issues
                            </span>
                        </CardTitle>
                        {fullView && (
                            <CardDescription>
                                All issues currently assigned to team members.
                            </CardDescription>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {displayIssues.map((issue) => (
                            <IssueCard key={issue.issue_id} issue={issue} />
                        ))}
                        {!fullView && total_assigned_issues > 3 && (
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md p-2 text-sm hover:bg-primary/5 hover:underline"
                                onClick={handleViewAll}
                            >
                                View all {total_assigned_issues} issues
                            </a>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
