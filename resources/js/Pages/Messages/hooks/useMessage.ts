import { User } from '@/types';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    id: number;
    user: User;
    recipient_id: number;
    text: string;
    created_at: string;
    is_mine: boolean;
}

export function useMessages(
    initialMessages: Message[],
    authUserId: number,
    recipientId: string | null,
    users: User[],
) {
    const [messages, setMessages] = useState<Message[]>(
        initialMessages.map((message) => ({
            ...message,
            is_mine: message.user.id === authUserId,
        })),
    );
    const [recipient, setRecipient] = useState<User | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    // Handle recipient updates
    useEffect(() => {
        if (recipientId) {
            setRecipient(
                users.find((user) => user.id === Number(recipientId)) || null,
            );
        }
        scrollToBottom();
    }, [messages, users, recipientId]);

    // WebSocket connection
    useEffect(() => {
        if (!recipientId) return;

        const channelName = `chat.${authUserId}`;
        const channel = window.Echo.private(channelName);

        channel.listen('GotMessage', (event: { message: Message }) => {
            const isRelevantMessage =
                (event.message.user.id === Number(recipientId) &&
                    event.message.recipient_id === authUserId) ||
                (event.message.user.id === authUserId &&
                    event.message.recipient_id === Number(recipientId));

            if (isRelevantMessage) {
                const newMessage = {
                    ...event.message,
                    is_mine: event.message.user.id === authUserId,
                };

                setMessages((prev) => {
                    const isDuplicate = prev.some(
                        (msg) => msg.id === newMessage.id,
                    );
                    if (isDuplicate) return prev;
                    return [...prev, newMessage];
                });

                setTimeout(scrollToBottom, 100);
            }
        });

        return () => {
            channel.stopListening('GotMessage');
            window.Echo.leave(channelName);
        };
    }, [authUserId, recipientId]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || !recipientId) return;

        try {
            await router.post(
                '/messages/message',
                {
                    text,
                    recipient_id: recipientId,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setNewMessage('');
                    },
                    onError: (errors) => {
                        console.error('Failed to send message', errors);
                    },
                },
            );
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return {
        messages,
        recipient,
        newMessage,
        setNewMessage,
        sendMessage,
        messagesContainerRef,
    };
}
