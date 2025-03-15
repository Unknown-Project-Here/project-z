import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { IndexProject } from '@/types';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { ContactLinks } from './ContactLinks';
import { ProjectStack } from './ProjectStack';

interface ProjectCardProps {
    project: IndexProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="flex h-[450px] flex-col transition-shadow hover:shadow-lg">
            <CardHeader className="flex-none">
                <div className="flex items-start justify-between gap-2">
                    <Link href={route('projects.show', project.id)}>
                        <CardTitle className="line-clamp-3 text-xl">
                            {project.title}
                        </CardTitle>
                    </Link>
                    <Badge
                        variant={project.is_active ? 'success' : 'destructive'}
                        className="text-white"
                    >
                        {project.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-6">
                <div className="flex flex-col gap-2 text-sm">
                    <span className="line-clamp-1">
                        By {project.creator.username}
                    </span>
                    <p className="mb-2 line-clamp-2">{project.description}</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <ProjectStack stack={project.stack} />

                    <div className="flex items-center gap-2 text-sm">
                        <span>Project Skill Level:</span>
                        <span className="capitalize text-primary">
                            {project.skill_level}
                        </span>
                    </div>

                    <p className="mt-2 text-xs">
                        Created:{' '}
                        {new Date(project.created_at).toLocaleDateString()}
                    </p>
                </div>

                <ContactLinks contact={project.contact} />
            </CardContent>
            <CardFooter className="h-16 flex-none px-6">
                <div className="flex w-full justify-end">
                    <Button
                        asChild
                        variant="default"
                        className="flex items-center gap-2"
                    >
                        <Link href={route('projects.show', project.id)}>
                            <Eye className="h-4 w-4" />
                            View Project
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
