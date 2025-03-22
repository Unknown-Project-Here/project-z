import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import { ConfigurationHeader } from './ConfigurationHeader';
import { ConfigStep } from './ConfigurationStep';
import { MembersRequestConfigStep } from './MembersRequestConfigStep';
import { ProgressIndicator } from './ProgressIndicator';
import { QuestionsConfigStep } from './QuestionsConfigStep';
import { RepoConfigStep } from './RepoConfigStep';

export default function ConfigurationBanner() {
    const project = useProjectProps();
    const mustConfigure = project.must_configure;

    if (!mustConfigure) {
        return null;
    }

    const steps: ConfigStep[] = [];

    if ('repo' in mustConfigure) {
        steps.push({
            id: 'repo',
            label: 'Connect Repository',
            completed: !mustConfigure.repo,
        });
    }

    if ('questions' in mustConfigure) {
        steps.push({
            id: 'questions',
            label: 'Configure Application Questions',
            completed: !mustConfigure.questions,
        });
    }

    if ('members_request' in mustConfigure) {
        steps.push({
            id: 'members_request',
            label: 'Configure Members Request',
            completed: !mustConfigure.members_request,
        });
    }

    const completedSteps = steps.filter((step) => step.completed).length;

    if (steps.length === 0 || completedSteps === steps.length) {
        return null;
    }

    const handleConfigUpdate = () => {
        router.reload();
    };

    const renderStepComponent = (step: ConfigStep) => {
        switch (step.id) {
            case 'repo':
                return <RepoConfigStep key={step.id} step={step} />;
            case 'questions':
                return <QuestionsConfigStep key={step.id} step={step} />;
            case 'members_request':
                return (
                    <MembersRequestConfigStep
                        key={step.id}
                        step={step}
                        onConfigUpdate={handleConfigUpdate}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] p-6 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-50 dark:opacity-30" />

            <div className="relative space-y-4">
                <ConfigurationHeader />
                <ProgressIndicator
                    completedSteps={completedSteps}
                    totalSteps={steps.length}
                />
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map(renderStepComponent)}
                </div>
            </div>
        </div>
    );
}
