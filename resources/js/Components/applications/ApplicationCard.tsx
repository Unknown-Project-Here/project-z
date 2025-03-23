import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Application } from '@/types';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Eye, MessageCircle } from 'lucide-react';

interface ApplicationCardProps {
    application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="@container">
                <Card className="bg-transparent p-6">
                    <div className="flex items-center justify-between gap-4 @[300px]:flex-col @[690px]:flex-row">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={application.user.avatar} />
                                <AvatarFallback>
                                    <img
                                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${application.user.username}`}
                                        alt={application.user.username}
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">
                                    {application.user.username}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">
                                    {dayjs(application.created_at).fromNow()}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary">
                                <MessageCircle className="mr-2" />
                                Message
                            </Button>
                            <Button asChild>
                                <Link
                                    href={route('projects.show', {
                                        project: application.project_id,
                                        application: application.id,
                                        activeTab: 'members',
                                        activeSection: 'application',
                                    })}
                                >
                                    <Eye className="mr-2" />
                                    View Application
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ApplicationCard;
