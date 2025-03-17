import { Message, User } from '@/types';
import { router } from '@inertiajs/react';
import { ChatInterface } from './Partials/ChatInterface';
import { EmptyState } from './Partials/EmptyState';
import { UserList } from './Partials/UserList';
import { useMessages } from './hooks/useMessage';

interface MessagesProps {
    messages: Message[];
    auth: { user: { id: number } };
    recipientId: string | null;
    users: User[];
}

export default function Messages({
    messages: initialMessages,
    auth,
    recipientId,
    users,
}: MessagesProps) {
    const {
        messages,
        recipient,
        newMessage,
        setNewMessage,
        sendMessage,
        messagesContainerRef,
    } = useMessages(initialMessages, auth.user.id, recipientId, users);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(newMessage);
        }
    };

    const handleImageSelect = (file: File | null) => {
        console.log(file);
    };

    return (
        <div className="flex h-full">
            <div className="w-80 border-r bg-white">
                <UserList
                    users={users}
                    currentUserId={auth.user.id}
                    onUserSelect={(userId) =>
                        router.visit(`/messages?user_id=${userId}`, {
                            preserveScroll: true,
                            preserveState: true,
                            replace: true,
                        })
                    }
                />
            </div>

            <div className="flex flex-1 flex-col bg-gray-50">
                <div className="border-b bg-white px-4 py-3 shadow-sm">
                    <h1 className="text-xl font-semibold text-primary">
                        {recipientId && users.length > 0
                            ? `Messages with ${recipient?.username || 'Unknown'}`
                            : 'Messages'}
                    </h1>
                </div>

                {!recipientId ? (
                    <EmptyState
                        title="No messages yet"
                        description="Select a teammate to start messaging"
                    />
                ) : (
                    <ChatInterface
                        messages={messages}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleKeyPress={handleKeyPress}
                        handleSendMessage={() => sendMessage(newMessage)}
                        messagesContainerRef={messagesContainerRef}
                        handleImageSelect={handleImageSelect}
                    />
                )}
            </div>
        </div>
    );
}
