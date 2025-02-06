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

export default function ProjectTechnologiesForm({
    className = '',
    project,
}: {
    className?: string;
    project: {
        id: number;
        technologies: string[];
    };
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            technologies: project.technologies,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('projects.technologies.update', project.id));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Project Technologies</CardTitle>
                <CardDescription>
                    Update the technologies used in your project.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="technologies">Technologies</Label>
                        <Input
                            id="technologies"
                            value={data.technologies.join(', ')}
                            onChange={(e) =>
                                setData(
                                    'technologies',
                                    e.target.value
                                        .split(',')
                                        .map((tech) => tech.trim()),
                                )
                            }
                            placeholder="React, TypeScript, Node.js"
                        />
                        <p className="text-sm text-muted-foreground">
                            Separate technologies with commas
                        </p>
                        {errors.technologies && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.technologies}
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
