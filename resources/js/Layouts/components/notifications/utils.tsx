import { NotificationType } from '@/Layouts/components/notifications/types';
import { FolderPlus, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';

export const getIcon = (type: NotificationType): ReactNode => {
    switch (type) {
        case NotificationType.PROJECT_REQUEST:
            return <FolderPlus className="mr-2 h-4 w-4 text-blue-500" />;
        case NotificationType.PROJECT_INVITATION:
            return <UserPlus className="mr-2 h-4 w-4 text-green-500" />;
        default:
            return null;
    }
};
