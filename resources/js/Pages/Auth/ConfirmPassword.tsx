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
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Confirm Password</CardTitle>
                        <CardDescription>
                            This is a secure area of the application. Please
                            confirm your password before continuing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />
                                {errors.password && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {errors.password}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Confirm
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
