import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('settings.update'));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your account's profile information and email address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                            required
                            autoComplete="username"
                        />
                        {errors.username && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.username}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="email"
                        />
                        {errors.email && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.email}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="space-y-2">
                            <p className="text-sm">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-primary underline hover:text-primary/80"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <Alert>
                                    <AlertDescription>
                                        A new verification link has been sent to
                                        your email address.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}

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
