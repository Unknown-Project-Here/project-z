import SetNewPassword from '@/Pages/Profile/Partials/PasswordUpdate/SetNewPassword';
import UpdatePassword from '@/Pages/Profile/Partials/PasswordUpdate/UpdatePassword';

export default function UpdatePasswordForm({
    className = '',
    hasPassword = true,
}: {
    className?: string;
    hasPassword?: boolean;
}) {
    return hasPassword ? (
        <UpdatePassword className={className} />
    ) : (
        <SetNewPassword className={className} />
    );
}
