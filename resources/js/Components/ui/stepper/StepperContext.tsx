import { createContext, useContext } from 'react';

type StepperContextValue = {
    activeStep: number;
    setActiveStep: (step: number) => void;
    totalSteps: number;
    canMoveNext: boolean;
    onComplete?: () => void;
    validateStep?: (stepIndex: number) => boolean;
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
