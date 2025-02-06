import { createContext, useContext } from 'react';

type StepperContextValue = {
    activeStep: number;
    onStepChange?: (step: number) => void;
    onComplete?: () => void;
    totalSteps: number;
    canMoveNext: boolean;
};

const StepperContext = createContext<StepperContextValue | undefined>(
    undefined,
);

export const useStepperContext = () => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error('Stepper components must be used within a Stepper');
    }
    return context;
};

export { StepperContext, type StepperContextValue };
