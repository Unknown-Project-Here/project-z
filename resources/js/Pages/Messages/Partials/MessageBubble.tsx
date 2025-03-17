import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Message } from '@/types';
import { MessageImage } from './MessageImage';

export const MessageBubble = ({ message }: { message: Message }) => (
    <div
        className={`flex flex-col gap-1 ${
            message.is_mine ? 'items-end' : 'items-start'
        }`}
    >
        {!message.is_mine && (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary">
                    <AvatarImage
                        src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${message.user.username}`}
                        alt={message.user.username}
                    />
                    <AvatarFallback>
                        {message.user?.username?.charAt(0)?.toUpperCase() ??
                            '?'}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-primary">
                    {message.user.username}
                </span>
            </div>
        )}
        <div
            className={`relative max-w-[80%] rounded-lg px-4 py-2 md:max-w-[60%] ${
                message.is_mine
                    ? 'bg-primary text-white'
                    : 'border bg-white text-gray-900'
            }`}
        >
            {message.text && (
                <p className="break-words text-sm">{message.text}</p>
            )}
            {message.image_url && (
                <MessageImage imageUrl={message.image_url} className="mt-2" />
            )}
            <div
                className={`mt-1 w-full text-end text-xs ${
                    message.is_mine ? 'text-white/80' : 'text-gray-500'
                }`}
            >
                {new Date(message.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
        </div>
    </div>
);
