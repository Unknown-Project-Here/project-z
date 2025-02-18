import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePageProps } from '@/hooks/usePageProps';
import { IndexProject } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Eye, Github } from 'lucide-react';

export default function ProjectIndex() {
    const { projects } = usePageProps<{ projects: IndexProject[] }>().props;

    return (
        <>
            <Head title="Projects Home" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-start justify-between">
                    <h1 className="mb-8 text-3xl font-bold">Projects</h1>
                    {projects.length > 0 && (
                        <Button asChild>
                            <Link href={route('projects.create')}>
                                Create Project
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.length > 0 ? (
                        projects.map((project) => {
                            return (
                                <Card
                                    key={project.id}
                                    className="flex h-[450px] flex-col transition-shadow hover:shadow-lg"
                                >
                                    <CardHeader className="h-28 flex-none">
                                        <div className="flex items-start justify-between gap-2">
                                            <Link
                                                href={route(
                                                    'projects.show',
                                                    project.id,
                                                )}
                                            >
                                                <CardTitle className="line-clamp-3 text-xl">
                                                    {project.title}
                                                </CardTitle>
                                            </Link>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs ${
                                                    project.is_active
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-red-500 text-white'
                                                }`}
                                            >
                                                {project.is_active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 overflow-y-auto px-6 pt-4">
                                        <div className="flex flex-col gap-2 text-sm">
                                            <span className="line-clamp-1">
                                                By {project.creator.username}
                                            </span>
                                            <p className="mb-4 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-2">
                                            {project.stack && (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {project.stack
                                                        .slice(0, 3)
                                                        .map((tech) => (
                                                            <span
                                                                key={tech.id}
                                                                className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                                                            >
                                                                {tech.name}
                                                            </span>
                                                        ))}
                                                    {project.stack.length >
                                                        3 && (
                                                        <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                                                            +
                                                            {project.stack
                                                                .length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-muted-foreground">
                                                    Project Skill Level:
                                                </span>
                                                <span className="capitalize text-primary">
                                                    {project.skill_level}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-xs">
                                                Created:{' '}
                                                {new Date(
                                                    project.created_at,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="mt-4 space-y-2 text-sm">
                                            {project.contact?.map(
                                                (contact, index) => {
                                                    if (
                                                        contact.includes(
                                                            'github.com',
                                                        )
                                                    ) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Github className="h-4 w-4" />
                                                                <a
                                                                    href={
                                                                        contact
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    GitHub
                                                                </a>
                                                            </div>
                                                        );
                                                    }
                                                    if (
                                                        contact.includes(
                                                            'discord.com',
                                                        )
                                                    ) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Icons.discord className="h-4 w-4" />
                                                                <a
                                                                    href={
                                                                        contact
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    Discord
                                                                </a>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                },
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="h-16 flex-none px-6">
                                        <div className="flex w-full justify-end">
                                            <Button
                                                asChild
                                                variant="default"
                                                className="flex items-center gap-2"
                                            >
                                                <Link
                                                    href={route(
                                                        'projects.show',
                                                        project.id,
                                                    )}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Project
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full">
                            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-6 py-8 text-center">
                                <div className="space-y-2">
                                    <h3 className="font-medium text-gray-900">
                                        No projects found
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Get started by creating your first
                                        project to collaborate with others.
                                    </p>
                                </div>
                                <Button asChild variant="default">
                                    <Link href={route('projects.create')}>
                                        Create Project
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Update Pagination */}
                {projects.length > 0 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            disabled={!projects.length}
                            asChild
                        >
                            <Link
                                href={route('projects.index', {
                                    page:
                                        Number(
                                            new URL(
                                                window.location.href,
                                            ).searchParams.get('page') || 1,
                                        ) - 1,
                                })}
                                preserveScroll
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            disabled={projects.length < 9}
                            asChild
                        >
                            <Link
                                href={route('projects.index', {
                                    page:
                                        Number(
                                            new URL(
                                                window.location.href,
                                            ).searchParams.get('page') || 1,
                                        ) + 1,
                                })}
                                preserveScroll
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
