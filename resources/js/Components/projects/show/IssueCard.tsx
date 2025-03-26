import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ProjectIssue } from '@/types';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { IssueUserDisplay } from './IssueUserDisplay';

interface IssueCardProps {
    issue: ProjectIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    return (
        <div className="rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-100 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="relative overflow-hidden rounded-lg p-4 shadow-sm transition-all duration-200 @container">
                <div className="absolute right-2 top-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto cursor-pointer rounded-full"
                        onClick={() => window.open(issue.issue_url, '_blank')}
                    >
                        <ArrowUpRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-start gap-2 pr-10">
                        <span className="text-sm font-medium">
                            #{issue.issue_id}
                        </span>
                        <h3 className="break-words font-medium">
                            {issue.issue_title}
                        </h3>
                    </div>
                    <Badge
                        variant={
                            issue.issue_state === 'open'
                                ? 'success'
                                : 'destructive'
                        }
                        className="w-fit"
                    >
                        {issue.issue_state === 'open' ? 'Open' : 'Closed'}
                    </Badge>
                    <div className="space-y-2">
                        <div className="flex flex-col items-start gap-2 @[300px]:flex-row @[300px]:items-center">
                            <div className="text-sm">Creator:</div>
                            <IssueUserDisplay user={issue.issue_creator} />
                        </div>

                        {issue.issue_assignees.length > 0 && (
                            <div className="flex flex-col items-start gap-1 @[300px]:flex-row @[300px]:items-center">
                                <div className="text-sm">Assignees:</div>
                                {issue.issue_assignees.map((assignee) => (
                                    <IssueUserDisplay
                                        key={assignee.id}
                                        user={assignee}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
