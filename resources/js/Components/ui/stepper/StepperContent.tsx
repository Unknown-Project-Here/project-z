import { StepperNavigation } from '@/components/ui/stepper/StepperNavigation';
import { cn } from '@/lib/utils';

interface StepperContentProps {
    content: React.ReactNode;
    className?: string;
}

export function StepperContent({ content, className }: StepperContentProps) {
    if (!content) return null;

    return (
        <div className={cn('flex flex-1 flex-col', className)}>
            <div className="flex-1 overflow-auto">{content}</div>
            <StepperNavigation />
        </div>
    );
}
