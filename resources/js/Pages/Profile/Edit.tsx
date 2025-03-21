import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
    hasPassword,
    auth,
    flash,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    hasPassword: boolean;
    flash: {
        closeTab?: boolean;
    };
}>) {
    useEffect(() => {
        if (flash.closeTab) {
            window.close();
        }
    }, [flash.closeTab]);

    return (
        <>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm
                            className="max-w-xl"
                            hasPassword={hasPassword}
                        />
                    </div>

                    <div className="p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm
                            className="max-w-xl"
                            mustVerifyPasswordToDeleteAccount={hasPassword}
                            username={auth.user.username}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
