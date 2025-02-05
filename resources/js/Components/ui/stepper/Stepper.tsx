import { OnboardingType } from '@/components/onboarding/types';
import { Step } from '@/components/ui/stepper/Step';
import { StepConnector } from '@/components/ui/stepper/StepConnector';
import { StepperContent } from '@/components/ui/stepper/StepperContent';
import {
    StepperContext,
    type StepperContextValue,
} from '@/components/ui/stepper/StepperContext';
import { StepperSidebar } from '@/components/ui/stepper/StepperSidebar';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';

interface StepperProps {
    activeStep: number;
    onStepChange?: (step: number) => void;
    onComplete?: () => void;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    allowNext?: boolean;
    onboardingData: OnboardingType;
}

interface StepperComposition {
    Step: typeof Step;
    Connector: typeof StepConnector;
}

const Stepper: React.FC<StepperProps> & StepperComposition = ({
    activeStep,
    onStepChange,
    onComplete,
    className,
    contentClassName,
    children,
    allowNext = true,
    onboardingData,
}) => {
    const totalSteps = React.Children.count(children);

    // Check if current step has at least one selection
    const hasValidSelection = useMemo(() => {
        if (!onboardingData) return false;

        switch (activeStep) {
            case 0: // Tech Stack
                return onboardingData.techStack.length > 0;
            case 1: // Languages
                return Object.keys(onboardingData.languages).length > 0;
            case 2: // Frameworks
                return Object.keys(onboardingData.frameworks).length > 0;
            case 3: // Expertise
                return !!onboardingData.expertise;
            case 4: // Roles
                return onboardingData.roles.length > 0;
            default:
                return true;
        }
    }, [activeStep, onboardingData]);

    const contextValue = useMemo(
        () => ({
            activeStep,
            onStepChange,
            onComplete,
            totalSteps,
            canMoveNext: allowNext && hasValidSelection,
        }),
        [
            activeStep,
            onStepChange,
            onComplete,
            totalSteps,
            allowNext,
            hasValidSelection,
        ],
    );

    const [navigationSteps, activeContent] = React.Children.toArray(
        children,
    ).reduce<[React.ReactNode[], React.ReactNode]>(
        ([stepArr, currentContent], child) => {
            if (React.isValidElement(child) && child.type === Step) {
                const index = stepArr.length;
                const isActive = index === activeStep;
                const stepContent = isActive ? child.props.children : null;

                return [
                    [
                        ...stepArr,
                        React.cloneElement(child, {
                            index,
                            ...child.props,
                            children: null,
                        }),
                    ],
                    isActive ? stepContent : currentContent,
                ];
            }
            return [stepArr, currentContent];
        },
        [[], null],
    );

    return (
        <StepperContext.Provider value={contextValue}>
            <div className={cn('flex h-full flex-col sm:flex-row', className)}>
                <StepperSidebar navigationSteps={navigationSteps} />
                <StepperContent
                    content={activeContent}
                    className={contentClassName}
                />
            </div>
        </StepperContext.Provider>
    );
};

Stepper.Step = Step;
Stepper.Connector = StepConnector;

export { Stepper, type StepperContextValue };
