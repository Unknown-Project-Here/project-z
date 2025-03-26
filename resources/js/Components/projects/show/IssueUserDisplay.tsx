import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { IssueUser } from '@/types';

export function IssueUserDisplay({ user }: { user: IssueUser }) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                <AvatarImage
                    src={user.avatar || undefined}
                    alt={user.username}
                />
                <AvatarFallback>
                    <img
                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`}
                        alt={user.username}
                    />
                </AvatarFallback>
            </Avatar>
            <span className="text-sm">{user.username}</span>
        </div>
    );
}
