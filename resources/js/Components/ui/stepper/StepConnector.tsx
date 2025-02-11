import { useStepperContext } from '@/components/ui/stepper/StepperContext';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface StepConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number;
}

export function StepConnector({
    className,
    index,
    ...props
}: StepConnectorProps) {
    const { activeStep } = useStepperContext();
    const isCompleted = index < activeStep;

    return (
        <div
            className={cn(
                'relative flex items-center justify-center',
                // Mobile: horizontal line
                'h-[2px] w-16',
                // Desktop: vertical line
                'sm:mx-0 sm:ml-4 sm:h-8 sm:w-[2px]',
                className,
            )}
            {...props}
        >
            <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-muted" />
                <div
                    className={cn(
                        'absolute inset-0 bg-primary transition-all duration-200',
                        isCompleted ? 'w-full' : 'w-0',
                        'sm:w-full',
                        isCompleted ? 'sm:h-full' : 'sm:h-0',
                    )}
                />
            </div>
        </div>
    );
}
