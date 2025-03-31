import { useMessage } from '@/hooks/useMessage';
import { Message, User } from '@/types';
import { router } from '@inertiajs/react';
import { ChatInterface } from './Partials/ChatInterface';
import { EmptyState } from './Partials/EmptyState';
import { UserList } from './Partials/UserList';

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
    } = useMessage(initialMessages, auth.user.id, recipientId, users);

    // Get all active chats with their last messages
    const activeChats = users.reduce(
        (acc, user) => {
            const userMessages = messages.filter(
                (msg) =>
                    (msg.user_id === user.id &&
                        msg.recipient_id === auth.user.id) ||
                    (msg.user_id === auth.user.id &&
                        msg.recipient_id === user.id),
            );

            if (userMessages.length > 0) {
                const lastMessage = userMessages.reduce((latest, current) =>
                    latest.created_at > current.created_at ? latest : current,
                );

                acc.push({
                    userId: user.id,
                    lastMessage: lastMessage.image_url
                        ? '📷 Image'
                        : lastMessage.text,
                    timestamp: lastMessage.created_at,
                });
            }
            return acc;
        },
        [] as { userId: number; lastMessage: string; timestamp: string }[],
    );

    // Filter current chat messages
    const currentChatMessages = messages.filter(
        (message) =>
            message.recipient_id === Number(recipientId) ||
            (message.user_id === Number(recipientId) &&
                message.recipient_id === auth.user.id),
    );

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(newMessage);
        }
    };

    const handleImageSelect = (url: string | null) => {
        if (url) {
            sendMessage('', url);
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-80 border-r bg-white">
                <UserList
                    users={users}
                    currentUserId={auth.user.id}
                    activeChats={activeChats}
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
                        messages={currentChatMessages}
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
