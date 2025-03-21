import { Progress } from '@/Components/ui/progress';

interface ProgressIndicatorProps {
    completedSteps: number;
    totalSteps: number;
}

export function ProgressIndicator({
    completedSteps,
    totalSteps,
}: ProgressIndicatorProps) {
    const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Setup Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>
    );
}
