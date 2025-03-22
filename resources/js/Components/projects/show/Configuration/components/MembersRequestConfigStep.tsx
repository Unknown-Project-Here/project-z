import { ConfigStep, ConfigurationStep } from './ConfigurationStep';
import { RequestConfigButtons } from './RequestConfigButtons';

interface MembersRequestConfigStepProps {
    step: ConfigStep;
    onConfigUpdate?: () => void;
}

export function MembersRequestConfigStep({
    step,
    onConfigUpdate,
}: MembersRequestConfigStepProps) {
    return (
        <ConfigurationStep step={step}>
            <RequestConfigButtons stepId={step.id} onSuccess={onConfigUpdate} />
        </ConfigurationStep>
    );
}
