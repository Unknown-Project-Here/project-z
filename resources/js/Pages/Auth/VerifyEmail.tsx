import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="container mx-auto flex items-center justify-center px-4 py-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Email Verification</CardTitle>
                        <CardDescription>
                            Verify your email to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">
                            Thanks for signing up! Before getting started, could
                            you verify your email address by clicking on the
                            link we just emailed to you? If you didn't receive
                            the email, we will gladly send you another.
                        </p>

                        {status === 'verification-link-sent' && (
                            <Alert className="mb-4">
                                <AlertDescription>
                                    A new verification link has been sent to the
                                    email address you provided during
                                    registration.
                                </AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={submit}>
                            <div className="mt-4 flex items-center justify-between">
                                <Button type="submit" disabled={processing}>
                                    Resend Verification Email
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => post(route('logout'))}
                                >
                                    Log Out
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
