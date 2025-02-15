import ProjectInviteDialogButton from '@/components/projects/invite/components/ProjectInviteDialogButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Project } from '@/types';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CalendarIcon, CodeIcon, GitForkIcon } from 'lucide-react';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export default function ProjectShow({
    project,
    permissions,
}: {
    project: Project;
    permissions: { project: { invite: boolean; edit: boolean } };
}) {
    const projectStats = {
        commits: 156,
        contributors: 4,
        codeLines: 12500,
    };

    return (
        <>
            <Head title={project.title} />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <div className="flex items-center gap-2">
                        {permissions.project.invite && (
                            <ProjectInviteDialogButton project={project} />
                        )}
                        {permissions.project.edit && (
                            <Button asChild>
                                <Link href={route('projects.edit', project.id)}>
                                    Edit
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Project Overview</CardTitle>
                                <Badge className="bg-green-500 text-sm">
                                    Active
                                </Badge>
                            </div>
                            <CardDescription>
                                Project details and statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <p>{project.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-2 font-semibold">
                                    Project Lead
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="bg-primary">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${project.creator.username}`}
                                            alt={project.creator.username}
                                        />
                                        <AvatarFallback>
                                            {project.creator.username}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">
                                            {project.creator.username}
                                        </p>
                                        <p className="text-sm">
                                            Joined{' '}
                                            {dayjs(
                                                project.creator.created_at,
                                            ).format('Do MMMM YYYY')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <CodeIcon className="size-4" />
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {projectStats.codeLines.toLocaleString()}
                                        </p>
                                        <p className="text-sm">Lines of Code</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <GitForkIcon className="size-4" />
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {projectStats.commits}
                                        </p>
                                        <p className="text-sm">Total Commits</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="size-4" />
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {projectStats.contributors}
                                        </p>
                                        <p className="text-sm">Contributors</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Technologies</CardTitle>
                                <CardDescription>
                                    Tech stack and tools used
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {Object.entries(project.stack).map(
                                        ([category, technologies]) => (
                                            <div
                                                key={category}
                                                className="space-y-2"
                                            >
                                                <h3 className="font-medium capitalize">
                                                    {category}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {technologies.map(
                                                        (tech: {
                                                            id: number;
                                                            name: string;
                                                            skill_level:
                                                                | string
                                                                | null;
                                                        }) => (
                                                            <Badge
                                                                key={tech.id}
                                                                variant="secondary"
                                                            >
                                                                {tech.name}
                                                                {tech.skill_level && (
                                                                    <span className="ml-1 text-xs opacity-70">
                                                                        (
                                                                        {
                                                                            tech.skill_level
                                                                        }
                                                                        )
                                                                    </span>
                                                                )}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline</CardTitle>
                                <CardDescription>
                                    Project milestones
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium">
                                            Created
                                        </p>
                                        <p className="text-sm">
                                            {dayjs(project.created_at).format(
                                                'Do MMMM YYYY',
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Last Updated
                                        </p>
                                        <p className="text-sm">
                                            {dayjs(project.updated_at).format(
                                                'Do MMMM YYYY',
                                            )}{' '}
                                            (
                                            <i>
                                                {dayjs(
                                                    project.updated_at,
                                                ).fromNow()}
                                            </i>
                                            )
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
