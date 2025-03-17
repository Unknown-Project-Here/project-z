import { useHandleUserSelect } from '@/Components/projects/invite/store/hooks/useHandleUserSelect';
import { useSearchUsers } from '@/Components/projects/invite/store/hooks/useSearchUsers';
import { useSetSearchQuery } from '@/Components/projects/invite/store/hooks/useSetSearchQuery';
import { useInviteStore } from '@/Components/projects/invite/store/use-invite-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { Project } from '@/types';
import { useEffect, useRef } from 'react';

interface SearchUsersStepProps {
    project: Project;
}

export function SearchUsersStep({ project }: SearchUsersStepProps) {
    const searchQuery = useInviteStore((state) => state.searchQuery);
    const users = useInviteStore((state) => state.users);
    const isSearching = useInviteStore((state) => state.isSearching);
    const setSearchQuery = useSetSearchQuery();
    const handleUserSelect = useHandleUserSelect();
    const searchUsers = useSearchUsers();
    const lastSearchQuery = useRef(searchQuery);
    const [debouncedQuery] = useDebouncedValue(searchQuery, 300);

    useEffect(() => {
        // Only search if the query has actually changed
        if (lastSearchQuery.current === debouncedQuery) {
            return;
        }
        lastSearchQuery.current = debouncedQuery;

        void searchUsers(project, debouncedQuery);
    }, [debouncedQuery, project, searchUsers]);

    return (
        <div className="py-4">
            <Input
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />

            <div className="max-h-[200px] space-y-2 overflow-y-auto">
                {isSearching ? (
                    <div className="text-center text-muted-foreground">
                        Searching...
                    </div>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.user_id}
                            className="flex items-center space-x-2"
                        >
                            <Avatar>
                                <AvatarImage
                                    src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`}
                                    alt={user.username}
                                />
                                <AvatarFallback>{user.username}</AvatarFallback>
                            </Avatar>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => handleUserSelect(user)}
                            >
                                {user.username}
                            </Button>
                        </div>
                    ))
                ) : searchQuery.length >= 2 ? (
                    <div className="text-center text-muted-foreground">
                        No users found
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        Type at least 2 characters to search
                    </div>
                )}
            </div>
        </div>
    );
}
