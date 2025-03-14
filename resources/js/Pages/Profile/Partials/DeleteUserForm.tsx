import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    DialogStack,
    DialogStackBody,
    DialogStackContent,
    DialogStackDescription,
    DialogStackFooter,
    DialogStackHeader,
    DialogStackNext,
    DialogStackOverlay,
    DialogStackPrevious,
    DialogStackTitle,
    DialogStackTrigger,
} from '@/Components/ui/kibo-ui/dialog-stack';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
    mustVerifyPasswordToDeleteAccount = true,
    username = '',
}: {
    className?: string;
    mustVerifyPasswordToDeleteAccount?: boolean;
    username?: string;
}) {
    const [open, setOpen] = useState(false);
    const confirmInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
        username_confirmation: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('settings.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => confirmInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setOpen(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DialogStack open={open} onOpenChange={setOpen}>
                <DialogStackTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </DialogStackTrigger>
                <DialogStackOverlay />

                <DialogStackBody>
                    <DialogStackContent>
                        <DialogStackHeader>
                            <DialogStackTitle>
                                Are you sure you want to delete your account?
                            </DialogStackTitle>
                            <DialogStackDescription>
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                This action cannot be undone.
                            </DialogStackDescription>
                        </DialogStackHeader>
                        <DialogStackFooter>
                            <DialogStackNext asChild>
                                <Button variant="destructive">Continue</Button>
                            </DialogStackNext>
                        </DialogStackFooter>
                    </DialogStackContent>

                    <DialogStackContent>
                        <form onSubmit={deleteUser}>
                            <DialogStackHeader>
                                <DialogStackTitle>
                                    Confirm account deletion
                                </DialogStackTitle>
                                <DialogStackDescription>
                                    {mustVerifyPasswordToDeleteAccount ? (
                                        'Please enter your password to confirm you would like to permanently delete your account.'
                                    ) : (
                                        <>
                                            Please type{' '}
                                            <strong>{username}-delete</strong>{' '}
                                            to confirm you would like to
                                            permanently delete your account.
                                        </>
                                    )}
                                </DialogStackDescription>
                            </DialogStackHeader>
                            <div className="py-4">
                                {mustVerifyPasswordToDeleteAccount ? (
                                    <>
                                        <Label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            ref={confirmInput}
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            placeholder="Password"
                                            required
                                        />
                                        {errors.password && (
                                            <Alert
                                                variant="destructive"
                                                className="mt-2"
                                            >
                                                <AlertDescription>
                                                    {errors.password}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Label
                                            htmlFor="username_confirmation"
                                            className="sr-only"
                                        >
                                            Confirmation
                                        </Label>
                                        <Input
                                            id="username_confirmation"
                                            type="text"
                                            ref={confirmInput}
                                            value={data.username_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'username_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        {errors.username_confirmation && (
                                            <Alert
                                                variant="destructive"
                                                className="mt-2"
                                            >
                                                <AlertDescription>
                                                    {
                                                        errors.username_confirmation
                                                    }
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </>
                                )}
                            </div>
                            <DialogStackFooter className="justify-between">
                                <DialogStackPrevious asChild>
                                    <Button
                                        variant="outline"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </Button>
                                </DialogStackPrevious>
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Deleting...'
                                        : 'Delete Account'}
                                </Button>
                            </DialogStackFooter>
                        </form>
                    </DialogStackContent>
                </DialogStackBody>
            </DialogStack>
        </section>
    );
}
