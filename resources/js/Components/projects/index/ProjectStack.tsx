import { ProjectStack as ProjectStackType } from '@/types';

interface ProjectStackProps {
    stack: ProjectStackType[];
}

export function ProjectStack({ stack }: ProjectStackProps) {
    if (!stack.length) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {stack.slice(0, 3).map((tech) => (
                <span
                    key={tech.id}
                    className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                    {tech.name}
                </span>
            ))}
            {stack.length > 3 && (
                <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                    +{stack.length - 3}
                </span>
            )}
        </div>
    );
}
