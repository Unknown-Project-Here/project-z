import { Button } from '@/components/ui/button';
import { useStepperContext } from '@/components/ui/stepper/StepperContext';

export function StepperNavigation() {
    const { activeStep, onStepChange, onComplete, totalSteps, canMoveNext } =
        useStepperContext();

    const isLastStep = activeStep === totalSteps - 1;

    const handleNext = () => {
        if (!canMoveNext) return;

        if (isLastStep && onComplete) {
            onComplete();
        } else if (onStepChange) {
            onStepChange(Math.min(activeStep + 1, totalSteps - 1));
        }
    };

    const handlePrev = () => {
        if (onStepChange) {
            onStepChange(Math.max(activeStep - 1, 0));
        }
    };

    return (
        <div className="mt-6 flex justify-between">
            <Button
                onClick={handlePrev}
                disabled={activeStep === 0}
                variant="outline"
            >
                Back
            </Button>
            <Button onClick={handleNext} disabled={!canMoveNext}>
                {isLastStep ? 'Complete' : 'Continue'}
            </Button>
        </div>
    );
}
