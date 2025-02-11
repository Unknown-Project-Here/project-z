import { Step } from '@/components/ui/stepper/Step';
import { StepConnector } from '@/components/ui/stepper/StepConnector';
import { StepperContent } from '@/components/ui/stepper/StepperContent';
import { StepperContext } from '@/components/ui/stepper/StepperContext';
import { StepperSidebar } from '@/components/ui/stepper/StepperSidebar';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

interface StepperProps {
    onComplete?: () => void;
    className?: string;
    children: React.ReactNode;
    contentClassName?: string;
    validateStep?: (stepIndex: number) => boolean;
    defaultStep?: number;
}

interface StepperComposition {
    Step: typeof Step;
    Connector: typeof StepConnector;
}

const Stepper: React.FC<StepperProps> & StepperComposition = ({
    onComplete,
    className,
    contentClassName,
    children,
    validateStep,
    defaultStep = 0,
}) => {
    const [activeStep, setActiveStep] = useState(defaultStep);
    const totalSteps = React.Children.count(children);

    const canMoveNext = useMemo(() => {
        if (!validateStep) return true;
        return validateStep(activeStep);
    }, [activeStep, validateStep]);

    const contextValue = useMemo(
        () => ({
            activeStep,
            setActiveStep,
            totalSteps,
            canMoveNext,
            onComplete,
            validateStep,
        }),
        [activeStep, totalSteps, canMoveNext, onComplete, validateStep],
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

export { Stepper };
