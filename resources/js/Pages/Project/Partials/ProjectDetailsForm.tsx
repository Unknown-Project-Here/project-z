import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ProjectDetailsForm({
    className = '',
    project,
}: {
    className?: string;
    project: {
        id?: number;
        name: string;
        description: string;
    };
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: project.name,
            description: project.description,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('projects.update', project.id));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                    Update your project's information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.name}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            required
                        />
                        {errors.description && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.description}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>

                        {recentlySuccessful && (
                            <p className="text-sm">Saved.</p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
