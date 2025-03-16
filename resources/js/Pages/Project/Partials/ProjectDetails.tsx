import GithubRepoSelector from '@/Components/projects/create/GithubRepoSelector';
import ProjectDescriptionField from '@/Components/projects/create/ProjectDescriptionField';
import ProjectTitleField from '@/Components/projects/create/ProjectTitleField';
import SocialLinksSection from '@/Components/projects/create/SocialLinksSection';
import ValidationErrors from '@/Components/projects/create/ValidationErrors';
import { Card } from '@/Components/ui/card';
import { ProjectType } from '@/types';
import { useState } from 'react';

interface ExtendedProjectDetailsProps {
    data: ProjectType;
    onChange: (
        field: keyof ProjectType,
        value:
            | string
            | string[]
            | Record<string, string>
            | { id: number; name: string }
            | null,
    ) => void;
}

export default function ProjectDetails({
    data,
    onChange,
}: ExtendedProjectDetailsProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (field: string, value: string) => {
        if (!value.trim()) {
            setErrors((prev) => ({
                ...prev,
                [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
            }));
            return false;
        }
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
        return true;
    };

    const handleFieldChange = (
        field: keyof ProjectType,
        value:
            | string
            | string[]
            | Record<string, string>
            | { id: number; name: string }
            | null,
    ) => {
        onChange(field, value);
        if (
            (field === 'title' || field === 'description') &&
            typeof value === 'string'
        ) {
            validateField(field, value);
        }
    };

    return (
        <div className="space-y-4">
            <Card className="p-4">
                <div className="space-y-4">
                    <ProjectTitleField
                        value={data.title}
                        onChange={handleFieldChange}
                    />

                    <ProjectDescriptionField
                        value={data.description}
                        onChange={handleFieldChange}
                    />

                    <GithubRepoSelector
                        selectedRepo={data.githubRepo}
                        onChange={handleFieldChange}
                    />

                    <SocialLinksSection
                        contact={data.contact}
                        onChange={handleFieldChange}
                    />

                    <ValidationErrors errors={errors} />
                </div>
            </Card>
        </div>
    );
}
