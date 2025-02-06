import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Stepper } from '@/components/ui/stepper/Stepper';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ContactDetailsForm from './Partials/ContactDetailsForm';
import ProjectDetailsForm from './Partials/ProjectDetailsForm';
import ProjectTechnologiesForm from './Partials/ProjectTechnologiesForm';

export default function CreateProject() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleProjectDetails = (data: any) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setActiveStep(1);
    };

    const handleTechnologies = (data: any) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setActiveStep(2);
    };

    const handleContactDetails = (data: any) => {
        const finalData = { ...formData, ...data };
        router.post('/projects', finalData);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const steps = [
        {
            title: 'Project Details',
            description: 'Basic information about your project',
        },
        {
            title: 'Technologies',
            description: 'Select required technologies',
        },
        {
            title: 'Contact Details',
            description: 'Your contact information',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create New Project</h1>
                <Badge variant="outline">Draft</Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Project Setup</CardTitle>
                        <CardDescription>
                            Complete the following steps to create your project
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Stepper
                            activeStep={activeStep}
                            onStepChange={handleStepChange}
                            allowNext={true}
                            onboardingData={{} as any}
                        >
                            <Stepper.Step
                                title={steps[0].title}
                                description={steps[0].description}
                            >
                                <ProjectDetailsForm
                                    onSubmit={handleProjectDetails}
                                />
                                <div className="mt-6 flex justify-end">
                                    <Button onClick={() => handleStepChange(1)}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>

                            <Stepper.Step
                                title={steps[1].title}
                                description={steps[1].description}
                            >
                                <ProjectTechnologiesForm
                                    onSubmit={handleTechnologies}
                                />
                                <div className="mt-6 flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStepChange(0)}
                                    >
                                        Previous
                                    </Button>
                                    <Button onClick={() => handleStepChange(2)}>
                                        Next
                                    </Button>
                                </div>
                            </Stepper.Step>

                            <Stepper.Step
                                title={steps[2].title}
                                description={steps[2].description}
                            >
                                <ContactDetailsForm
                                    onSubmit={handleContactDetails}
                                />
                                <div className="mt-6 flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStepChange(1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        onClick={handleContactDetails}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Create Project
                                    </Button>
                                </div>
                            </Stepper.Step>
                        </Stepper>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Setup Progress</CardTitle>
                            <CardDescription>
                                Project creation status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        className="flex items-center space-x-2"
                                    >
                                        <Badge
                                            variant={
                                                activeStep >= index
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {index + 1}
                                        </Badge>
                                        <span
                                            className={
                                                activeStep >= index
                                                    ? 'font-medium'
                                                    : 'text-muted-foreground'
                                            }
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
