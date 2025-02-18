import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { usePageProps } from '@/hooks/usePageProps';
import { Project, ProjectsResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Github,
    MessageSquare,
} from 'lucide-react';

export default function ProjectIndex() {
    const { projects } = usePageProps<{ projects: ProjectsResponse }>().props;

    console.log('projects', projects);

    return (
        <>
            <Head title="Projects Home" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-start justify-between">
                    <h1 className="mb-8 text-3xl font-bold">Projects</h1>
                    <Button asChild>
                        <Link href={route('projects.create')}>
                            Create Project
                        </Link>
                    </Button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.data.length > 0 ? (
                        projects.data.map((project: Project) => {
                            return (
                                <Card
                                    key={project.id}
                                    className="flex h-[420px] flex-col transition-shadow hover:shadow-lg"
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
                                                By {project.user.username}
                                            </span>
                                            <p className="mb-4 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        {project.stack && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {(Array.isArray(project.stack)
                                                    ? project.stack
                                                    : JSON.parse(
                                                          project.stack as string,
                                                      )
                                                ).map(
                                                    (
                                                        tech: string,
                                                        index: number,
                                                    ) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}

                                        <div className="space-y-2 text-sm">
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
                                                                <MessageSquare className="h-4 w-4" />
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

                                        <div className="">
                                            <div className="mt-4 flex items-center gap-2 text-sm">
                                                <span className="text-muted-foreground">
                                                    Project Skill Level:
                                                </span>
                                                <span className="capitalize text-primary">
                                                    {project.skill_level}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-xs">
                                                Created:{' '}
                                                {new Date(
                                                    project.created_at,
                                                ).toLocaleDateString()}
                                            </p>
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
                        <div className="col-span-full py-8 text-center">
                            <p>No projects found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {projects.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            disabled={projects.current_page === 1}
                            asChild
                        >
                            <Link
                                href={route('projects.index', {
                                    page: projects.current_page - 1,
                                })}
                                preserveScroll
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Link>
                        </Button>

                        <span>
                            Page {projects.current_page} of {projects.last_page}
                        </span>

                        <Button
                            variant="outline"
                            disabled={
                                projects.current_page === projects.last_page
                            }
                            asChild
                        >
                            <Link
                                href={route('projects.index', {
                                    page: projects.current_page + 1,
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
