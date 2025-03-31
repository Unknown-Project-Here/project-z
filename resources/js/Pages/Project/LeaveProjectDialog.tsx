import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { StyledText } from '@/Components/ui/styled-text';
import { useProjectEditProps } from '@/hooks/useProjectEditProps';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Loader, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function LeaveProjectDialog() {
    const { id: project_id, title: project_title } = useProjectEditProps();
    const [dialogStepOne, setDialogStepOne] = useState(false);
    const [dialogStepTwo, setDialogStepTwo] = useState(false);
    const [allowLeave, setAllowLeave] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmProjectName, setConfirmProjectName] = useState('');

    const handleLeaveProject = async () => {
        setIsLoading(true);
        await axios
            .post(route('projects.leave', { project_id }))
            .then((response) => {
                setAllowLeave(response.data.allow_leave);
                setMessage(response.data.message);
                setDialogStepOne(true);
                if (message && allowLeave) {
                    setDialogStepOne(true);
                }
                if (message && !allowLeave) {
                    toast.error(response.data.message);
                }
            })
            .catch((e) => {
                if (e.status === 403) {
                    toast.error(e.response.data.message);
                } else {
                    toast.error(
                        'There was an error trying to leave the project, please try again later.',
                    );
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const openDialogStepTwo = () => {
        setDialogStepOne(false);
        setDialogStepTwo(true);
    };

    const actuallyLeaveProject = () => {
        setConfirmProjectName('');
        setDialogStepTwo(false);

        axios
            .post(route('projects.confirmLeave', { project_id, project_title }))
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((e) => {
                if (e.status === 400 || e.status === 403) {
                    toast.error(e.response.data.message);
                } else {
                    toast.error(
                        'There was an error trying to leave the project, please try again later.',
                    );
                }
            })
            .finally(() => {
                router.visit(route('projects.index'));
            });
    };

    const isProjectNameCorrect = confirmProjectName === project_title;

    return (
        <>
            <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleLeaveProject}
            >
                {isLoading ? (
                    <Loader className="spin mr-2 animate-spin" />
                ) : (
                    <>
                        <LogOut className="spin mr-2" />
                        Leave Project
                    </>
                )}
            </Button>
            <Dialog open={dialogStepOne} onOpenChange={setDialogStepOne}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave this project?</DialogTitle>
                        <DialogDescription>{message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            disabled={isLoading}
                            onClick={openDialogStepTwo}
                        >
                            Leave Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={dialogStepTwo} onOpenChange={setDialogStepTwo}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave Project ?</DialogTitle>
                        <DialogDescription className="flex flex-col gap-4">
                            <StyledText
                                text={`Confirm leaving this project. You will no longer
                                be able to access this project. This action is
                                irreversible. Write "${project_title}" to
                                confirm.`}
                                highlights={[
                                    {
                                        phrase: 'irreversible',
                                        className: 'font-bold underline',
                                    },
                                ]}
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={confirmProjectName}
                        onChange={(e) => setConfirmProjectName(e.target.value)}
                        maxLength={255}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            disabled={isLoading || !isProjectNameCorrect}
                            onClick={actuallyLeaveProject}
                            variant="destructive"
                        >
                            Leave Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default LeaveProjectDialog;
