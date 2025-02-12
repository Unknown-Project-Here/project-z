import DomainsStep from '@/components/onboarding/DomainsStep';
import ExpertiseStep from '@/components/onboarding/ExpertiseStep';
import FrameworksStep from '@/components/onboarding/FrameworksStep';
import LanguagesStep from '@/components/onboarding/LanguagesStep';
import SpecializationsStep from '@/components/onboarding/SpecializationsStep';
import { OnboardingType } from '@/components/onboarding/types';
import { Stepper } from '@/components/ui/stepper/Stepper';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { router } from '@inertiajs/react';

const defaultOnboardingData: OnboardingType = {
    domain: [],
    language: [],
    framework: [],
    expertise: '',
    specialization: [],
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
                return onboardingData.domain.length > 0;
            case 1:
                return onboardingData.language.length > 0;
            case 2:
                return onboardingData.framework.length > 0;
            case 3:
                return !!onboardingData.expertise;
            case 4:
                return onboardingData.specialization.length > 0;
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

    const handleComplete = () => {
        try {
            router.post(
                route('profile.onboarding.store'),
                {
                    skills: { ...onboardingData },
                },
                {
                    onSuccess: () => {
                        localStorage.removeItem('onboarding');
                    },
                    onError: (errors) => {
                        console.error('Onboarding failed:', errors);
                    },
                    preserveScroll: true,
                },
            );
        } catch (error) {
            alert('Failed to submit onboarding data, please try again.');
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
                        title="Domains"
                        description="What domains do you work in?"
                    >
                        <div className="mb-4">
                            <p className="text-lg font-semibold leading-none tracking-tight">
                                Domains - What domains do you work in?
                            </p>
                        </div>
                        <DomainsStep
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
                                Specializations - What specializations best
                                describe you?
                            </p>
                        </div>
                        <SpecializationsStep
                            data={onboardingData}
                            onChange={updateOnboardingData}
                        />
                    </Stepper.Step>
                </Stepper>
            </div>
        </div>
    );
}
