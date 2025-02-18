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
    Globe,
    MessageSquare,
} from 'lucide-react';

export default function ProjectIndex() {
    const { projects } = usePageProps<{ projects: ProjectsResponse }>().props;

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
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={route(
                                                    'projects.show',
                                                    project.id,
                                                )}
                                            >
                                                <CardTitle className="text-xl">
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
                                        <div className="flex items-center gap-2 text-sm">
                                            <span>
                                                By {project.user.username}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {project.stack && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {(Array.isArray(project.stack)
                                                    ? project.stack
                                                    : JSON.parse(
                                                          project.stack as unknown as string,
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
                                            {project.contact.website && (
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4" />
                                                    <a
                                                        href={
                                                            project.contact
                                                                .website
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        Website
                                                    </a>
                                                </div>
                                            )}
                                            {project.contact.github && (
                                                <div className="flex items-center gap-2">
                                                    <Github className="h-4 w-4" />
                                                    <a
                                                        href={
                                                            project.contact
                                                                .github
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        GitHub
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <p className="mt-4 text-xs">
                                            Created:{' '}
                                            {new Date(
                                                project.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-4">
                                        {project.contact.discord && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={
                                                        project.contact.discord
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <MessageSquare className="h-4 w-4" />
                                                    Discord
                                                </a>
                                            </Button>
                                        )}
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
