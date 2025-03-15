import { Input } from '@/Components/ui/input';
import { ProjectType } from '@/types';

interface ProjectTitleFieldProps {
    value: string;
    onChange: (field: keyof ProjectType, value: string) => void;
}

export default function ProjectTitleField({
    value,
    onChange,
}: ProjectTitleFieldProps) {
    return (
        <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none">
                Project Title
            </label>
            <div className="relative">
                <Input
                    id="title"
                    value={value}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="Enter project title"
                    maxLength={100}
                />
                <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                    {value.length}/100
                </div>
            </div>
        </div>
    );
}
