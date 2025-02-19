import { ProjectCard } from '@/components/projects/index/ProjectCard';
import { Button } from '@/components/ui/button';
import { usePageProps } from '@/hooks/usePageProps';
import { IndexProject } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
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

                {/* Pagination */}
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
