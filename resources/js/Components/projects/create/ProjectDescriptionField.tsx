import { Textarea } from '@/Components/ui/textarea';
import { ProjectType } from '@/types';

interface ProjectDescriptionFieldProps {
    value: string;
    onChange: (field: keyof ProjectType, value: string) => void;
}

export default function ProjectDescriptionField({
    value,
    onChange,
}: ProjectDescriptionFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
            >
                Project Description
            </label>
            <div className="relative">
                <Textarea
                    id="description"
                    value={value}
                    onChange={(e) => onChange('description', e.target.value)}
                    placeholder="Describe your project"
                    rows={4}
                    maxLength={5000}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {value.length}/5000
                </div>
            </div>
        </div>
    );
}
