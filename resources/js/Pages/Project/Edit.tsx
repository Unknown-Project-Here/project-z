import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { InputWithCounter } from '@/Components/ui/input-with-counter';
import { Separator } from '@/Components/ui/separator';
import { Switch } from '@/Components/ui/switch';
import { TextareaWithCounter } from '@/Components/ui/textarea-with-counter';
import Heading from '@/Components/ui/typography/Heading';
import { useProjectEditProps } from '@/hooks/useProjectEditProps';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import LeaveProjectDialog from './LeaveProjectDialog';
export default function Edit() {
    const { id, title, description, is_active, is_requestable } =
        useProjectEditProps();
    const [projectTitle, setProjectTitle] = useState(title);
    const [projectDescription, setProjectDescription] = useState(description);
    const [isActive, setIsActive] = useState(is_active);
    const [isRequestable, setIsRequestable] = useState(is_requestable);

    const titleOrDescriptionHasChanged =
        projectTitle !== title || projectDescription !== description;

    const isActiveOrRequestableHasChanged =
        isActive !== is_active || isRequestable !== is_requestable;

    const handleSaveTitleAndDescription = () => {
        axios
            .post(route('projects.updateTitleAndDescription'), {
                project_id: id,
                title: projectTitle,
                description: projectDescription,
            })
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => {
                toast.error('Failed to update project');
            })
            .finally(() => {
                router.visit(route('projects.edit', { project: id }));
            });
    };

    const handleSaveStatusAndRequestable = () => {
        axios
            .post(route('projects.handleUpdateStatusAndRequestable'), {
                project_id: id,
                is_active: isActive,
                is_requestable: isRequestable,
            })
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(() => {
                toast.error('Failed to update project');
            })
            .finally(() => {
                router.visit(route('projects.edit', { project: id }));
            });
    };

    return (
        <Card className="w-full border-none">
            <CardHeader>
                <CardTitle>
                    <Heading level={3}>Edit Project</Heading>
                </CardTitle>
                <CardDescription>
                    Make changes to your project settings here. Click save when
                    you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex w-full flex-col space-y-4">
                    <div className="space-y-2">
                        <Heading level={6}>Project Title</Heading>
                        <InputWithCounter
                            id="project-title"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            maxLength={50}
                        />
                    </div>

                    <div className="space-y-2">
                        <Heading level={6}>Project Description</Heading>
                        <TextareaWithCounter
                            id="project-description"
                            value={projectDescription}
                            onChange={(e) =>
                                setProjectDescription(e.target.value)
                            }
                            rows={5}
                            maxLength={200}
                        />
                    </div>
                    {titleOrDescriptionHasChanged && (
                        <Button
                            className="self-end"
                            onClick={handleSaveTitleAndDescription}
                        >
                            Save
                        </Button>
                    )}
                </div>

                <Separator />

                <div className="flex w-full flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Heading level={6}>Project Status</Heading>
                            <p className="text-sm text-muted-foreground">
                                Active projects are visible to all users
                            </p>
                        </div>
                        <Switch
                            id="project-status"
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Heading level={6}>Requestable</Heading>
                            <p className="text-sm text-muted-foreground">
                                Allows members to request to join this project
                            </p>
                        </div>
                        <Switch
                            id="project-requestable"
                            checked={isRequestable}
                            onCheckedChange={setIsRequestable}
                        />
                    </div>
                    {isActiveOrRequestableHasChanged && (
                        <Button
                            className="self-end"
                            onClick={handleSaveStatusAndRequestable}
                        >
                            Save
                        </Button>
                    )}
                </div>

                <Separator />

                <div className="space-y-4">
                    <Heading level={4}>Danger Zone</Heading>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="w-full sm:w-auto"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the project and
                                        remove all associated data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <LeaveProjectDialog />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
