import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Input } from '@/Components/ui/input';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { EmptyState } from './EmptyState';

interface UserListProps {
    users: User[];
    currentUserId: number;
    onUserSelect: (userId: number) => void;
}

export const UserList = ({
    users,
    currentUserId,
    onUserSelect,
}: UserListProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(
        (user) =>
            user.id !== currentUserId &&
            user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="px-4 pt-2">
                <Input
                    type="search"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10"
                />
            </div>

            {filteredUsers.length === 0 ? (
                <EmptyState
                    title="No users found"
                    description="Try a different search term"
                />
            ) : (
                <ScrollArea className="flex-1 px-4">
                    <div className="space-y-2">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="border-b border-gray-100 last:border-b-0"
                            >
                                <Link
                                    href={`/messages?user_id=${user.id}`}
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100"
                                    onClick={() => onUserSelect(user.id)}
                                >
                                    <Avatar className="h-10 w-10 bg-primary">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`}
                                            alt={user.username}
                                        />
                                        <AvatarFallback>
                                            {user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium text-primary">
                                        {user.username}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};
