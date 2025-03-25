import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { ProjectIssue } from '@/types';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface IssueCardProps {
    issue: ProjectIssue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-white/80 p-4 shadow-sm transition-all duration-200 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
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
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                        #{issue.issue_id}
                    </span>
                    <h3 className="font-medium">{issue.issue_title}</h3>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm">Creator:</div>
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={issue.issue_creator.avatar || undefined}
                                alt={issue.issue_creator.username}
                            />
                            <AvatarFallback>
                                <img
                                    src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${issue.issue_creator.username}`}
                                    alt={issue.issue_creator.username}
                                />
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                            {issue.issue_creator.username}
                        </span>
                    </div>

                    {issue.issue_assignees.length > 0 && (
                        <div className="flex gap-1">
                            <div className="text-sm">Assignees:</div>
                            {issue.issue_assignees.map((assignee) => (
                                <div
                                    key={assignee.id}
                                    className="flex items-center gap-2 pl-2"
                                >
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage
                                            src={assignee.avatar || undefined}
                                            alt={assignee.username}
                                        />
                                        <AvatarFallback>
                                            <img
                                                src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${assignee.username}`}
                                                alt={assignee.username}
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">
                                        {assignee.username}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(IssueCard);
