import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        credential: '',
        password: '',
        remember: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}{' '}
            <div className="container mx-auto flex items-center justify-center px-4 py-8">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Welcome back! Please login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="credential">
                                    Email or Username
                                </Label>
                                <Input
                                    id="credential"
                                    type="text"
                                    value={data.credential}
                                    onChange={(e) =>
                                        setData('credential', e.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                                {/* @ts-expect-error  error returns as errors.username or errors.email, look at LoginRequest.php */}
                                {errors.username && (
                                    <p className="text-sm text-red-500">
                                        {/* @ts-expect-error look at LoginRequest.php */}
                                        {errors.username}
                                    </p>
                                )}
                                {/* @ts-expect-error look at LoginRequest.php */}
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {/* @ts-expect-error look at LoginRequest.php */}
                                        {errors.email}
                                    </p>
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
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    defaultChecked={data.remember}
                                    checked={data.remember}
                                    onCheckedChange={(remember) =>
                                        setData('remember', remember as boolean)
                                    }
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                        {canResetPassword && (
                            <div className="mt-4 text-center">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        )}

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    (window.location.href = route(
                                        'oauth.redirect',
                                        'google',
                                    ))
                                }
                                className="space-x-2"
                            >
                                <Icons.google className="h-5 w-5" />
                                <span>Google</span>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    (window.location.href = route(
                                        'oauth.redirect',
                                        'github',
                                    ))
                                }
                                className="space-x-2"
                            >
                                <Icons.github className="h-5 w-5" />
                                <span>GitHub</span>
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    (window.location.href = route(
                                        'oauth.redirect',
                                        'discord',
                                    ))
                                }
                                className="space-x-2"
                            >
                                <Icons.discord className="h-5 w-5" />
                                <span>Discord</span>
                            </Button>
                        </div>
                        {/* Already have an account? */}
                        <div className="mt-4 text-center">
                            <Link
                                href="/register"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Don't have an account? Register here
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
