'use client';

import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import * as React from 'react';

interface DialogStackProps {
    isOpen: boolean;
    onClose: () => void;
    dialogContents: {
        title: string;
        description: string;
        content: React.ReactNode;
        hideNavigation?: boolean;
        customFooter?: React.ReactNode;
    }[];
    currentStep?: number;
    onStepChange?: (step: number) => void;
}

export function DialogStack({
    isOpen,
    onClose,
    dialogContents,
    currentStep,
    onStepChange,
}: DialogStackProps) {
    const [internalStep, setInternalStep] = React.useState(0);
    const wasOpen = React.useRef(false);

    // Use either controlled or uncontrolled step
    const currentIndex = currentStep ?? internalStep;
    const setCurrentIndex = onStepChange ?? setInternalStep;

    // Reset to first step only when dialog opens from a closed state
    React.useEffect(() => {
        if (isOpen && !wasOpen.current) {
            setCurrentIndex(0);
        }
        wasOpen.current = isOpen;
    }, [isOpen, setCurrentIndex]);

    const handlePrevious = React.useCallback(() => {
        setCurrentIndex(Math.max(0, currentIndex - 1));
    }, [currentIndex, setCurrentIndex]);

    const handleNext = React.useCallback(() => {
        setCurrentIndex(Math.min(dialogContents.length - 1, currentIndex + 1));
    }, [currentIndex, dialogContents.length, setCurrentIndex]);

    const currentDialog = dialogContents[currentIndex];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{currentDialog.title}</DialogTitle>
                    <DialogDescription>
                        {currentDialog.description}
                    </DialogDescription>
                </DialogHeader>
                {currentDialog.content}
                {!currentDialog.hideNavigation && (
                    <DialogFooter className="flex flex-row justify-end gap-2">
                        {currentDialog.customFooter ? (
                            currentDialog.customFooter
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentIndex === 0}
                                    className="max-w-fit"
                                >
                                    Previous
                                </Button>
                                {currentIndex < dialogContents.length - 1 && (
                                    <Button
                                        onClick={handleNext}
                                        className="max-w-fit"
                                    >
                                        Next
                                    </Button>
                                )}
                            </>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
