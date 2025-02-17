import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Project } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProjectRequestDialogProps {
    project: Project;
}

export default function ProjectRequestDialog({
    project,
}: ProjectRequestDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({});

    const handleSubmit = () => {
        form.post(route('projects.request', { project: project.id }), {
            preserveScroll: true,
            preserveState: true,
            only: ['permissions', 'flash'],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: ({ props }: { props: any }) => {
                if (props.flash.message) {
                    toast.success(props.flash.message);
                }
                setIsOpen(false);
            },
            onError: (errors) => {
                toast.error(
                    errors.message || 'Failed to send request to join project.',
                );
            },
        });
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="outline">
                Request to Join
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request to Join Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to request to join{' '}
                            <span className="font-medium">{project.title}</span>
                            ? The project owner will review your request.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={form.processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={form.processing}
                        >
                            {form.processing ? 'Sending...' : 'Send Request'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
