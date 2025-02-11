import { StepConnector } from '@/components/ui/stepper/StepConnector';
import { useStepperContext } from '@/components/ui/stepper/StepperContext';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

interface StepProps {
    index?: number;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export const Step: React.FC<StepProps> = ({
    index,
    title,
    children,
    className,
}) => {
    const { activeStep, totalSteps } = useStepperContext();
    const stepIndex =
        index ?? React.Children.count(React.Children.toArray(children));

    const isActive = stepIndex === activeStep;
    const isCompleted = stepIndex < activeStep;

    return (
        <>
            <div
                className={cn(
                    'group flex items-center sm:items-start',
                    'sm:gap-4',
                    className,
                )}
            >
                <div
                    className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                        isActive &&
                            'border-primary bg-primary text-primary-foreground',
                        isCompleted &&
                            'border-primary bg-primary text-primary-foreground',
                        !isActive &&
                            !isCompleted &&
                            'border-muted-foreground text-muted-foreground',
                    )}
                >
                    {isCompleted ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <span>{stepIndex + 1}</span>
                    )}
                </div>

                <div className="hidden sm:flex sm:flex-col">
                    <div className="text-base font-semibold">{title}</div>
                </div>
            </div>

            {isActive && children}

            {stepIndex < totalSteps - 1 && <StepConnector index={stepIndex} />}
        </>
    );
};
