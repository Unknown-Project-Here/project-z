import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { ProjectsResponse } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Github,
    Globe,
    MessageSquare,
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Project {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_active: boolean;
    stack?: string[];
    email: string;
    discord: string;
    github: string;
    website: string;
    created_at: string;
    updated_at: string;
    user: User;
}

interface PaginatedData {
    data: Project[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function ProjectIndex() {
    const { projects } = usePage().props as { projects: ProjectsResponse };

    return (
        <>
            <Head title="Projects Home" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-bold">Projects</h1>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.data.length > 0 ? (
                        projects.data.map((project) => (
                            <Card
                                key={project.id}
                                className="transition-shadow hover:shadow-lg"
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">
                                            {project.title}
                                        </CardTitle>
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
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>By {project.user.username}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 line-clamp-2 text-muted-foreground">
                                        {project.description}
                                    </p>

                                    {project.stack &&
                                        project.stack.length > 0 && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {project.stack.map(
                                                    (tech, index) => (
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
                                        {project.website && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={project.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    Website
                                                </a>
                                            </div>
                                        )}
                                        {project.github && (
                                            <div className="flex items-center gap-2">
                                                <Github className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    GitHub
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <p className="mt-4 text-xs text-muted-foreground">
                                        Created:{' '}
                                        {new Date(
                                            project.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-4">
                                    {project.discord && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <a
                                                href={project.discord}
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
                        ))
                    ) : (
                        <div className="col-span-full py-8 text-center">
                            <p className="text-muted-foreground">
                                No projects found
                            </p>
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

                        <span className="text-muted-foreground">
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
