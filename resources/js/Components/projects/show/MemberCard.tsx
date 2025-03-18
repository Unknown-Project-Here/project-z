import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Github, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

export interface MemberType {
    id: string;
    name: string;
    role: string;
    avatar: string;
    email: string;
    github: string;
    assignedIssues: number;
    status: 'active' | 'away' | 'inactive';
}

interface MemberCardProps {
    member: MemberType;
    onMessageClick?: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onMessageClick }) => {
    const handleMessageClick = () => {
        if (onMessageClick) {
            onMessageClick(member.id);
        }
    };

    return (
        <Card className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-ring/10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                            {member.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-card-foreground">
                                {member.name}
                            </div>
                            <Badge
                                variant={
                                    member.status === 'active'
                                        ? 'default'
                                        : 'secondary'
                                }
                                className={
                                    member.status === 'active'
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                }
                            >
                                {member.status}
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {member.role}
                        </div>
                        <div className="mt-1 text-sm font-medium text-primary">
                            {member.assignedIssues} assigned issues
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full border-border bg-background hover:border-ring hover:text-primary"
                    >
                        <a href={`mailto:${member.email}`} title="Email">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                        </a>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full border-border bg-background hover:border-ring hover:text-primary"
                    >
                        <a
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub Profile"
                        >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Message"
                        className="rounded-full border-border bg-background hover:border-ring hover:text-primary"
                        onClick={handleMessageClick}
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default React.memo(MemberCard);
