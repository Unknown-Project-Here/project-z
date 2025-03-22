import { Button } from '@/Components/ui/button';
import { useProjectProps } from '@/hooks/useProjectProps';
import { Link } from '@inertiajs/react';
import { ConfigStep, ConfigurationStep } from './ConfigurationStep';

interface QuestionsConfigStepProps {
    step: ConfigStep;
}

export function QuestionsConfigStep({ step }: QuestionsConfigStepProps) {
    const project = useProjectProps();

    return (
        <ConfigurationStep step={step}>
            <Button asChild>
                <Link href={route('projects.configure.questions', project.id)}>
                    Configure Questions
                </Link>
            </Button>
        </ConfigurationStep>
    );
}
