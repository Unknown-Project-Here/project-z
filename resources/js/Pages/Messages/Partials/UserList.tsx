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
    activeChats: { userId: number; lastMessage: string; timestamp: string }[];
}

export const UserList = ({
    users,
    currentUserId,
    onUserSelect,
    activeChats,
}: UserListProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on search query
    const searchResults = users.filter(
        (user) =>
            user.id !== currentUserId &&
            user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Get users with active chats and their last messages
    const activeUsers = users.filter((user) =>
        activeChats.some((chat) => chat.userId === user.id),
    );

    // Show search results only when searching
    const showSearchResults = searchQuery.length > 0;
    const displayedUsers = showSearchResults ? searchResults : activeUsers;

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="px-4 pt-2">
                <Input
                    type="search"
                    placeholder={
                        showSearchResults
                            ? 'Search users...'
                            : 'Search to start a new chat...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10"
                />
            </div>

            {displayedUsers.length === 0 ? (
                <EmptyState
                    title={
                        showSearchResults ? 'No users found' : 'No active chats'
                    }
                    description={
                        showSearchResults
                            ? 'Try a different search term'
                            : 'Search above to start a new chat'
                    }
                />
            ) : (
                <ScrollArea className="flex-1 px-4">
                    <div className="space-y-2">
                        {displayedUsers.map((user) => (
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
                                    <div className="flex w-full flex-col">
                                        <span className="text-sm font-medium text-primary">
                                            {user.username}
                                        </span>
                                        {!showSearchResults && (
                                            <div className="flex w-full items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {activeChats.find(
                                                        (chat) =>
                                                            chat.userId ===
                                                            user.id,
                                                    )?.lastMessage ||
                                                        'No messages yet'}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {activeChats.find(
                                                        (chat) =>
                                                            chat.userId ===
                                                            user.id,
                                                    )?.timestamp
                                                        ? new Date(
                                                              activeChats.find(
                                                                  (chat) =>
                                                                      chat.userId ===
                                                                      user.id,
                                                              )?.timestamp ||
                                                                  '',
                                                          ).toLocaleTimeString(
                                                              [],
                                                              {
                                                                  hour: '2-digit',
                                                                  minute: '2-digit',
                                                              },
                                                          )
                                                        : ''}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};
