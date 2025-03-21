import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import FancyCard from '@/Components/ui/fancy-card';
import { Separator } from '@/Components/ui/separator';
import H3 from '@/Components/ui/typography/H3';
import { useMemberApplicationProps } from '@/hooks/useMemberApplicationProps';
import { router } from '@inertiajs/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Check, MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';

function MemberApplication() {
    const application = useMemberApplicationProps();
    const handleMessage = () => {
        console.log('Opening message dialog');
    };
    const handleReject = () => {
        axios
            .post(
                route('projects.applications.reject', {
                    project: application.project_id,
                    application: application.id,
                }),
            )
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.visit(
                        route('projects.applications.index', {
                            project: application.project_id,
                        }),
                    );
                } else {
                    toast.error('Failed to reject application.');
                }
            })
            .catch(() => {
                toast.error('Failed to reject application.');
            });
    };
    const handleAccept = () => {
        axios
            .post(
                route('projects.applications.accept', {
                    project: application.project_id,
                    application: application.id,
                }),
            )
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.visit(
                        route('projects.applications.index', {
                            project: application.project_id,
                        }),
                    );
                } else {
                    toast.error('Failed to accept application.');
                }
            })
            .catch(() => {
                toast.error('Failed to accept application.');
            });
    };
    return (
        <div className="flex flex-col gap-y-4 p-4">
            <FancyCard>
                <CardHeader className="space-y-1">
                    <CardTitle>
                        <H3>Application from :</H3>
                    </CardTitle>
                    <div className="@container">
                        <div className="@[350px]:flex-row flex flex-col items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage
                                        src={application.user.avatar ?? ''}
                                    />
                                    <AvatarFallback>
                                        <img
                                            src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${application.user.username}`}
                                            alt={application.user.username}
                                        />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {application.user.username}
                                    </h2>
                                    <p className="text-sm">
                                        Applied{' '}
                                        {dayjs(
                                            application.created_at,
                                        ).fromNow()}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleMessage}
                                className="@[350px]:mt-0 @[350px]:min-w-fit mt-4 flex min-w-full items-center gap-2"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Message
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </FancyCard>

            <FancyCard>
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        {application.questions_and_answers.map((qa, index) => (
                            <div key={index}>
                                <div className="space-y-3">
                                    <h3 className="font-medium">
                                        Question {index + 1}: {qa.question}
                                    </h3>
                                    {qa.answer ? (
                                        <p className="">Answer: {qa.answer}</p>
                                    ) : (
                                        <p className="italic">
                                            No answer provided
                                        </p>
                                    )}
                                </div>
                                {index <
                                    application.questions_and_answers.length -
                                        1 && <Separator className="mt-6" />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </FancyCard>

            <div className="flex justify-end gap-4">
                <Button variant="destructive" onClick={handleReject}>
                    <X className="mr-2 h-4 w-4" />
                    Reject
                </Button>
                <Button onClick={handleAccept}>
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                </Button>
            </div>
        </div>
    );
}

export default MemberApplication;
