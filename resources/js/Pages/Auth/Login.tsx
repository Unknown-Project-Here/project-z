import { SocialLoginButtons } from '@/Pages/Auth/SocialLogin';
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

                        {/* Social Login Buttons */}
                        <SocialLoginButtons />

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
