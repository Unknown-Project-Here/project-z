import { Button } from '@/Components/ui/button';
import { useProjectProps } from '@/hooks/useProjectProps';
import axios from 'axios';
import { toast } from 'sonner';

interface RequestConfigButtonsProps {
    stepId: string;
    onSuccess?: () => void;
}

export function RequestConfigButtons({
    stepId,
    onSuccess,
}: RequestConfigButtonsProps) {
    const project = useProjectProps();

    if (stepId !== 'members_request') return null;

    const updateProjectRequestable = (isRequestable: boolean) => async () => {
        try {
            const response = await axios.post(
                route('projects.configure.request.toggle', project.id),
                { is_requestable: isRequestable },
            );

            toast[response.data.success ? 'success' : 'error'](
                response.data.success
                    ? response.data.message
                    : `Failed to ${isRequestable ? 'configure member requests' : 'mark as configured'}`,
            );

            if (response.data.success && onSuccess) onSuccess();
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while processing the request');
        }
    };

    return (
        <div className="mt-2 flex w-full max-w-full flex-col gap-2 sm:flex-row">
            <Button
                onClick={updateProjectRequestable(true)}
                variant="default"
                size="sm"
                className="w-full shrink-0 sm:flex-1"
            >
                Allow Requests
            </Button>
            <Button
                onClick={updateProjectRequestable(false)}
                variant="outline"
                size="sm"
                className="w-full shrink-0 sm:flex-1"
            >
                I'll do that later
            </Button>
        </div>
    );
}
