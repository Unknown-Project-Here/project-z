import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export interface IssueType {
    id: string;
    title: string;
    assignee: {
        name: string;
        avatar: string;
    };
    priority: string;
    difficulty: string;
    status: string;
    dueDate: string;
}

interface IssueCardProps {
    issue: IssueType;
    onViewDetails?: (issueId: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, onViewDetails }) => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-white/80 p-4 shadow-sm transition-all duration-200 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
            <div className="grid gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{issue.id}</span>
                    <h3 className="font-medium">{issue.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={issue.assignee.avatar}
                            alt={issue.assignee.name}
                        />
                        <AvatarFallback>
                            <img
                                src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${issue.assignee.name}`}
                                alt={issue.assignee.name}
                            />
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issue.assignee.name}</span>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{issue.priority}</Badge>
                <Badge variant="secondary">{issue.difficulty}</Badge>
                <Badge variant="secondary">{issue.status}</Badge>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-full hover:bg-[hsl(325.5,90%,90%)] hover:text-[hsl(325.5,90%,30%)] dark:hover:bg-[hsl(325.5,100%,73.7%)/0.2] dark:hover:text-[hsl(325.5,100%,73.7%)]"
                    onClick={() => onViewDetails?.(issue.id)}
                >
                    <ArrowUpRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default React.memo(IssueCard);
