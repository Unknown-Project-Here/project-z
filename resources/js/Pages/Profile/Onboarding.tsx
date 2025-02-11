import ExpertiseStep from '@/components/onboarding/ExpertiseStep';
import FrameworksStep from '@/components/onboarding/FrameworksStep';
import LanguagesStep from '@/components/onboarding/LanguagesStep';
import RolesStep from '@/components/onboarding/RolesStep';
import TechStackStep from '@/components/onboarding/TechStackStep';
import { OnboardingType } from '@/components/onboarding/types';
import { Stepper } from '@/components/ui/stepper/Stepper';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { router } from '@inertiajs/react';

const defaultOnboardingData: OnboardingType = {
    techStack: [],
    languages: [],
    frameworks: [],
    expertise: '',
    roles: [],
};

export default function OnboardingPage() {
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
                    className="min-h-[600px]"
                    contentClassName="flex flex-col sm:p-6"
                    onComplete={handleComplete}
                    validateStep={validateStep}
                >
                    <Stepper.Step
                        title="Tech Stack"
                        description="What technologies do you work with?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Tech Stack - What technologies do you work with?
                            </p>
                        </div>
                        <TechStackStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>

                    <Stepper.Step
                        title="Languages"
                        description="Which programming languages do you use?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Languages - Which programming languages do you
                                use?
                            </p>
                        </div>
                        <LanguagesStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>

                    <Stepper.Step
                        title="Frameworks"
                        description="What frameworks or libraries are you familiar with?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Frameworks - What frameworks or libraries are
                                you familiar with?
                            </p>
                        </div>
                        <FrameworksStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>

                    <Stepper.Step
                        title="Expertise"
                        description="How would you rate your expertise?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Expertise - How would you rate your expertise?
                            </p>
                        </div>
                        <ExpertiseStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>

                    <Stepper.Step
                        title="Roles"
                        description="What roles best describe you?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Roles - What roles best describe you?
                            </p>
                        </div>
                        <RolesStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>
                </Stepper>
            </div>
        </div>
    );
}
