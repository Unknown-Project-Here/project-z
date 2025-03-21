import { CheckCircle2, CircleDashed } from 'lucide-react';
import { RequestConfigButtons } from './RequestConfigButtons';

export interface ConfigStep {
    id: string;
    label: string;
    completed: boolean;
}

interface ConfigurationStepProps {
    step: ConfigStep;
    onConfigUpdate?: () => void;
}

export function ConfigurationStep({
    step,
    onConfigUpdate,
}: ConfigurationStepProps) {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-background/50 p-3">
            <div className="flex items-center gap-2">
                {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                    <CircleDashed className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">{step.label}</span>
            </div>

            {!step.completed && (
                <RequestConfigButtons
                    stepId={step.id}
                    onSuccess={onConfigUpdate}
                />
            )}
        </div>
    );
}
