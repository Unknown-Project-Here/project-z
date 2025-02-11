import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProjectDetailsProps, ProjectType } from '@/types';
import { useState } from 'react';

const contactOptions = [
    {
        label: 'Email',
        value: 'email',
        icon: 'mail',
        placeholder: 'Enter email address',
    },
    {
        label: 'Discord',
        value: 'discord',
        icon: 'discord',
        placeholder: 'Enter discord username',
    },
    {
        label: 'GitHub',
        value: 'github',
        icon: 'github',
        placeholder: 'Enter github username',
    },
    {
        label: 'Website',
        value: 'website',
        icon: 'globe',
        placeholder: 'Enter website URL',
    },
];

export default function ProjectDetails({
    data,
    onChange,
}: ProjectDetailsProps) {
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
        value: string,
        contactIndex?: number,
    ) => {
        if (field === 'contact' && typeof contactIndex === 'number') {
            const newContact = {
                email: data.contact.email || '',
                discord: data.contact.discord || '',
                github: data.contact.github || '',
                website: data.contact.website || '',
            };

            const contactField = contactOptions[contactIndex]
                .value as keyof typeof newContact;
            newContact[contactField] = value;
            onChange('contact', newContact);
        } else {
            onChange(field, value);
            if (field === 'title' || field === 'description') {
                validateField(field, value);
            }
        }
    };

    return (
        <div className="space-y-4">
            <Card className="p-4">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium leading-none"
                        >
                            Project Title
                        </label>
                        <div className="relative">
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    handleFieldChange('title', e.target.value)
                                }
                                placeholder="Enter project title"
                                maxLength={100}
                            />
                            <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                                {data.title.length}/100
                            </div>
                        </div>
                    </div>
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
                                value={data.description}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                placeholder="Describe your project"
                                rows={4}
                                maxLength={500}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                                {data.description.length}/500
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Project Social Links
                            </label>
                            {contactOptions.map((option) => {
                                const Icon =
                                    Icons[option.icon as keyof typeof Icons];
                                return (
                                    <div
                                        className="relative"
                                        key={option.value}
                                    >
                                        <Input
                                            id={option.value}
                                            value={
                                                data.contact[
                                                    option.value as keyof typeof data.contact
                                                ] || ''
                                            }
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    'contact',
                                                    e.target.value,
                                                    contactOptions.findIndex(
                                                        (opt) =>
                                                            opt.value ===
                                                            option.value,
                                                    ),
                                                )
                                            }
                                            className="pl-[83px]"
                                            placeholder={option.placeholder}
                                        />
                                        <div className="absolute inset-y-0 left-0 flex items-center">
                                            <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                Please fix the following errors:
                                <ul className="list-disc pl-4">
                                    {Object.values(errors).map(
                                        (error, index) => (
                                            <li key={index}>{error}</li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </Card>
        </div>
    );
}
