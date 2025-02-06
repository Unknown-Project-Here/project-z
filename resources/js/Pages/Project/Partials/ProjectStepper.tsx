import { StepperContent } from '@/components/ui/stepper/StepperContent';
import { StepperContext } from '@/components/ui/stepper/StepperContext';
import { StepperSidebar } from '@/components/ui/stepper/StepperSidebar';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface StepperProps {
    children: React.ReactNode;
    initialStep?: number;
    onComplete?: () => void;
    className?: string;
    canMoveNext?: boolean;
}

export function Stepper({
    children,
    initialStep = 0,
    onComplete,
    className,
    canMoveNext = true,
}: StepperProps) {
    const [activeStep, setActiveStep] = useState(initialStep);

    // Convert children to array and filter for Step components
    const steps = React.Children.toArray(children);
    const totalSteps = steps.length;

    // Get the current step's content
    const activeStepContent = steps[activeStep];

    // Create navigation steps for the sidebar
    const navigationSteps = steps.map((step, index) => {
        return React.cloneElement(step as React.ReactElement, {
            key: index,
            index,
        });
    });

    return (
        <StepperContext.Provider
            value={{
                activeStep,
                onStepChange: setActiveStep,
                onComplete,
                totalSteps,
                canMoveNext,
            }}
        >
            <div
                className={cn('flex flex-col sm:flex-row sm:gap-16', className)}
            >
                <StepperSidebar navigationSteps={navigationSteps} />
                <StepperContent content={activeStepContent} />
            </div>
        </StepperContext.Provider>
    );
}
