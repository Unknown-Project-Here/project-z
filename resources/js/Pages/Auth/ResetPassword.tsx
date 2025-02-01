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

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="container mx-auto flex items-center justify-center px-4 py-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                        <CardDescription>
                            Enter your new password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                                {errors.email && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {errors.email}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

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

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                {errors.password_confirmation && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {errors.password_confirmation}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Reset Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
