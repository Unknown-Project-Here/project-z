import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Filter } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import IssueCard, { IssueType } from './IssueCard';

interface AssignedIssuesProps {
    fullView?: boolean;
}

export function AssignedIssues({ fullView = false }: AssignedIssuesProps) {
    const issues: IssueType[] = useMemo(
        () => [
            {
                id: 'GH-123',
                title: 'Fix authentication bug in login flow',
                assignee: {
                    name: 'Alex Johnson',
                    avatar: '/placeholder.svg?height=40&width=40',
                },
                priority: 'p0',
                difficulty: 'mountain',
                status: 'in-progress',
                dueDate: '2023-04-15',
            },
            {
                id: 'GH-124',
                title: 'Implement dark mode toggle',
                assignee: {
                    name: 'Sarah Miller',
                    avatar: '/placeholder.svg?height=40&width=40',
                },
                priority: 'p2',
                difficulty: 'hill',
                status: 'todo',
                dueDate: '2023-04-18',
            },
        ],
        [],
    );

    const displayIssues = useMemo(
        () => (fullView ? issues : issues.slice(0, 5)),
        [fullView, issues],
    );

    const handleViewDetails = useCallback((issueId: string) => {
        console.log(`View details for issue ${issueId}`);
    }, []);

    const handleViewAll = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-50 dark:opacity-30" />
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
                    {fullView && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-background/50 hover:bg-background/80 hover:text-primary"
                        >
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {displayIssues.map((issue) => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                        {!fullView && issues.length > 5 && (
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md p-2 text-sm text-[hsl(var(--primary))] hover:bg-primary/5 hover:underline"
                                onClick={handleViewAll}
                            >
                                View all {issues.length} issues
                            </a>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default React.memo(AssignedIssues);
