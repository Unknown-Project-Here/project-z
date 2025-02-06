import { steps } from '@/components/onboarding/steps';
import { OnboardingType } from '@/components/onboarding/types';
import { Stepper } from '@/components/ui/stepper/Stepper';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const defaultOnboardingData: OnboardingType = {
    techStack: [],
    languages: [],
    frameworks: [],
    expertise: '',
    roles: [],
};

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [onboardingData, setOnboardingData] = useLocalStorage<OnboardingType>(
        {
            key: 'onboarding',
            defaultValue: defaultOnboardingData,
        },
    );

    const validateStep = (stepIndex: number) => {
        if (!onboardingData) return false;

        switch (stepIndex) {
            case 0:
                return onboardingData.techStack.length > 0;
            case 1:
                return onboardingData.languages.length > 0;
            case 2:
                return onboardingData.frameworks.length > 0;
            case 3:
                return !!onboardingData.expertise;
            case 4:
                return onboardingData.roles.length > 0;
            default:
                return true;
        }
    };

    const updateOnboardingData = (
        field: keyof OnboardingType,
        value: string | string[] | Record<string, string>,
    ) => {
        setOnboardingData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleComplete = async () => {
        try {
            await router.post(route('profile.onboarding.update'), {
                skills: { ...onboardingData },
            });
            localStorage.removeItem('onboarding');
        } catch (error) {
            console.error('Failed to submit onboarding data:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold">Welcome to Project-Z</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Please fill out the following information to help us understand
                your skills and experience.
            </p>

            <div className="rounded-lg">
                <Stepper
                    activeStep={currentStep}
                    onStepChange={setCurrentStep}
                    className="min-h-[600px]"
                    contentClassName="flex flex-col sm:p-6"
                    onComplete={handleComplete}
                    validateStep={validateStep}
                >
                    {steps.map((step) => (
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
                                data={onboardingData}
                                onChange={updateOnboardingData}
                            />
                        </Stepper.Step>
                    ))}
                </Stepper>
            </div>
        </div>
    );
}
