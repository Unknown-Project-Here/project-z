import { useSearchInviteUsers } from '@/Components/projects/invite/new/hooks/useSearchInviteUsers';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import FancyCard from '@/Components/ui/fancy-card';
import { InputWithCounter } from '@/Components/ui/input-with-counter';
import Pagination from '@/Components/ui/pagination';
import Heading from '@/Components/ui/typography/Heading';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
import { ChevronLeft, MessageCircle, UserPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function InviteUser() {
    const project = useProjectProps();
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get('search') || '';
    const [query, setQuery] = useState(initialSearch);
    const [debouncedQuery] = useDebouncedValue(query, 500);
    const [page, setPage] = useState(1);

    const { data: users, meta: pagination } = useSearchInviteUsers(
        project.id,
        debouncedQuery,
        page,
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleInvite = (userId: number) => {
        axios
            .post(route('projects.invite.store', { project: project.id }), {
                invitee_id: userId,
            })
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.reload();
                } else {
                    throw new Error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(
                    error.response.data.message ||
                        'Failed to invite user. Please try again.',
                );
            });
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between">
                <Heading level={3}>Invite User</Heading>
                <Button className="w-fit" onClick={() => window.history.back()}>
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                </Button>
            </div>

            <div className="">
                <InputWithCounter
                    placeholder="Search for a user by username"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                    maxLength={16}
                />

                {debouncedQuery.length < 2 && (
                    <div className="rounded-md py-2 text-gray-500">
                        Please enter at least 2 characters to search for a user
                    </div>
                )}

                {users.length === 0 && debouncedQuery.length >= 2 && (
                    <div className="rounded-md py-2 text-gray-500">
                        No users found matching "{debouncedQuery}"
                    </div>
                )}

                {users.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {users.map((user) => (
                            <FancyCard key={user.user_id}>
                                <CardContent className="items-center p-0 @container">
                                    <div className="flex w-full flex-col items-center justify-between gap-2 @[550px]:flex-row">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage
                                                    src={user.avatar}
                                                />
                                                <AvatarFallback>
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`}
                                                        alt={user.username}
                                                    />
                                                </AvatarFallback>
                                            </Avatar>
                                            <p>{user.username}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="secondary">
                                                <MessageCircle className="mr-2 size-4" />
                                                Message
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button>
                                                        <UserPlusIcon className="mr-2 size-4" />
                                                        Invite
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="mb-4">
                                                            {`Invite ${user.username}`}
                                                        </DialogTitle>
                                                        <div className="space-y-4">
                                                            <FancyCard>
                                                                <CardContent className="p-0">
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <Avatar>
                                                                                <AvatarImage
                                                                                    src={
                                                                                        user.avatar
                                                                                    }
                                                                                />
                                                                                <AvatarFallback>
                                                                                    <img
                                                                                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${user.username}`}
                                                                                        alt={
                                                                                            user.username
                                                                                        }
                                                                                    />
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <p>
                                                                                {
                                                                                    user.username
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <p>
                                                                            {`Are you sure you want to invite ${user.username} to this project?`}
                                                                        </p>
                                                                    </div>
                                                                    <div className="mt-4 flex justify-end gap-2">
                                                                        <DialogClose
                                                                            asChild
                                                                        >
                                                                            <Button variant="outline">
                                                                                Cancel
                                                                            </Button>
                                                                        </DialogClose>
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleInvite(
                                                                                    user.user_id,
                                                                                )
                                                                            }
                                                                        >
                                                                            Invite
                                                                        </Button>
                                                                    </div>
                                                                </CardContent>
                                                            </FancyCard>
                                                        </div>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </FancyCard>
                        ))}

                        {pagination &&
                            pagination.total > pagination.per_page && (
                                <Pagination
                                    pagination={pagination}
                                    onPageChange={handlePageChange}
                                    className="mt-6"
                                />
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InviteUser;
