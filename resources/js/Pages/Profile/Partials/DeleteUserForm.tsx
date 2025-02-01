'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/kibo-ui/dialog-stack';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

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
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
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
                                    Please enter your password to confirm you
                                    would like to permanently delete your
                                    account.
                                </DialogStackDescription>
                            </DialogStackHeader>
                            <div className="py-4">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
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
