import React from 'react';

interface StepperSidebarProps {
    navigationSteps: React.ReactNode[];
}

export function StepperSidebar({ navigationSteps }: StepperSidebarProps) {
    return (
        <div className="flex shrink-0 flex-col px-6 max-sm:pb-6 sm:h-full">
            <div className="mt-6 flex flex-row items-center justify-center gap-0 sm:flex-col sm:items-start">
                {navigationSteps}
            </div>
        </div>
    );
}
