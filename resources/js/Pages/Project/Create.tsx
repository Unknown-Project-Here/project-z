import { Stepper } from '@/Components/ui/stepper/Stepper';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { usePageProps } from '@/hooks/usePageProps';
import { ProjectType } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { projectSteps } from './Partials/ProjectSteps';

type PagePropsWithUsernames = {
    usernames: {
        google?: string;
        github?: string;
        discord?: string;
    };
};

const defaultProjectData: ProjectType = {
    title: '',
    description: '',
    contact: {
        github: '',
        discord: '',
        email: '',
        website: '',
    },
    domain: [],
    language: [],
    framework: [],
    expertise: '',
    specialization: [],
};

export default function CreateProject() {
    const { props } = usePageProps<PagePropsWithUsernames>();

    // Initialize with default data
    const [projectData, setProjectData] = useLocalStorage({
        key: 'project-creation',
        defaultValue: defaultProjectData,
    });

    // Update contact info with usernames from props if they exist
    useEffect(() => {
        const usernames = props.usernames || {};

        if (usernames && Object.keys(usernames).length > 0) {
            setProjectData((prev) => {
                // Only update if the current values are empty
                const updatedContact = { ...prev.contact };

                if (usernames.github && !prev.contact.github) {
                    updatedContact.github = usernames.github;
                }

                if (usernames.discord && !prev.contact.discord) {
                    updatedContact.discord = usernames.discord;
                }

                if (usernames.google && !prev.contact.email) {
                    updatedContact.email = usernames.google;
                }

                return {
                    ...prev,
                    contact: updatedContact,
                };
            });
        }
    }, [props.usernames, setProjectData]);

    const validateStep = (stepIndex: number) => {
        if (!projectData) {
            setProjectData(defaultProjectData);
            return false;
        }

        switch (stepIndex) {
            case 0:
                return !!projectData.title && !!projectData.description;
            case 1:
                return projectData?.domain?.length > 0;
            case 2:
                return projectData?.language?.length > 0;
            case 3:
                return projectData?.framework?.length > 0;
            case 4:
                return !!projectData?.expertise;
            case 5:
                return projectData?.specialization?.length > 0;
            default:
                return true;
        }
    };

    const updateProjectData = (
        field: keyof ProjectType,
        value: string | string[] | Record<string, string>,
    ) => {
        setProjectData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleComplete = async () => {
        try {
            const formData = {
                title: projectData.title,
                description: projectData.description,
                contact: Object.fromEntries(
                    Object.entries(projectData.contact).filter(
                        ([, value]) => !!value,
                    ),
                ),
                skills: {
                    expertise: projectData.expertise,
                    domain: projectData.domain,
                    language: projectData.language,
                    framework: projectData.framework,
                    specialization: projectData.specialization,
                },
            };

            router.post(
                route('projects.store'),
                {
                    project: formData,
                },
                {
                    onSuccess: () => {
                        localStorage.removeItem('project-creation');
                    },
                    onError: (errors) => {
                        console.error('Validation errors:', errors);
                    },
                },
            );
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Fill out the details below to create your new project.
            </p>

            <div className="mt-8 rounded-lg">
                <Stepper
                    className="min-h-[600px]"
                    contentClassName="flex flex-col sm:p-6"
                    onComplete={handleComplete}
                    validateStep={validateStep}
                >
                    {projectSteps.map((step) => (
                        <Stepper.Step
                            key={step.title}
                            title={step.title}
                            description={step.description}
                        >
                            <div className="mb-4 flex flex-col gap-4">
                                <p className="text-lg font-semibold leading-none tracking-tight">
                                    {step.title} - {step.description}
                                </p>
                            </div>
                            <step.component
                                data={projectData}
                                onChange={updateProjectData}
                            />
                        </Stepper.Step>
                    ))}
                </Stepper>
            </div>
        </div>
    );
}
