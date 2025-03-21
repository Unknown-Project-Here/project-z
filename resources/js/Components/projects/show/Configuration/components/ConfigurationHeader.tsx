import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ConfigurationHeaderProps {
    onConfigure: () => void;
}

export function ConfigurationHeader({ onConfigure }: ConfigurationHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Project Configuration Required
                </h2>
                <p className="text-sm text-muted-foreground">
                    Complete the setup process to enable all project features
                </p>
            </div>

            <Button
                onClick={onConfigure}
                className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
                Configure Project
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
