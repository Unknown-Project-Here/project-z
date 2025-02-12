import { Stepper } from '@/components/ui/stepper/Stepper';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ProjectType } from '@/types';
import { router } from '@inertiajs/react';
import { projectSteps } from './Partials/ProjectSteps';

const defaultProjectData: ProjectType = {
    title: '',
    description: '',
    contact: {
        github: '',
        discord: '',
        email: '',
        website: '',
    },
    techStack: [],
    languages: [],
    frameworks: [],
    expertise: '',
    roles: [],
};

export default function CreateProject() {
    const [projectData, setProjectData] = useLocalStorage({
        key: 'project-creation',
        defaultValue: defaultProjectData,
    });

    const validateStep = (stepIndex: number) => {
        if (!projectData) {
            setProjectData(defaultProjectData);
            return false;
        }

        switch (stepIndex) {
            case 0:
                return (
                    !!projectData.title &&
                    !!projectData.description &&
                    Object.values(projectData.contact).some((value) => !!value)
                );
            case 1:
                return projectData.techStack.length > 0;
            case 2:
                return projectData.languages.length > 0;
            case 3:
                return projectData.frameworks.length > 0;
            case 4:
                return !!projectData.expertise;
            case 5:
                return projectData.roles.length > 0;
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
                ...projectData,
                contact: Object.fromEntries(
                    Object.entries(projectData.contact).filter(
                        ([, value]) => !!value,
                    ),
                ),
            };

            console.log('formData', formData);

            await router.post(
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
                    // currentStep={currentStep}
                    // onStepChange={setCurrentStep}
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
