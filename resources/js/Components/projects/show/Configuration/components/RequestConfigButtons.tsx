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

    if (stepId !== 'members_request') {
        return null;
    }

    const handleAllowRequests = async () => {
        try {
            const response = await axios.post(
                route('projects.configure.request.toggle', project.id),
            );

            if (response.data.success) {
                toast.success(response.data.message);
                if (onSuccess) onSuccess();
            } else {
                toast.error('Failed to configure member requests.');
            }
        } catch (error) {
            toast.error('An error occurred while configuring member requests.');
        }
    };

    const handleDoLater = async () => {
        try {
            const response = await axios.post(
                route('projects.configure.mark-configured', project.id),
            );

            if (response.data.success) {
                toast.success(response.data.message);
                if (onSuccess) onSuccess();
            } else {
                toast.error('Failed to mark as configured.');
            }
        } catch (error) {
            toast.error('An error occurred while marking as configured.');
        }
    };

    return (
        <div className="mt-2 flex w-full max-w-full flex-col gap-2 sm:flex-row">
            <Button
                onClick={handleAllowRequests}
                variant="default"
                size="sm"
                className="w-full shrink-0 sm:flex-1"
            >
                Allow Requests
            </Button>
            <Button
                onClick={handleDoLater}
                variant="outline"
                size="sm"
                className="w-full shrink-0 sm:flex-1"
            >
                I'll do that later
            </Button>
        </div>
    );
}
