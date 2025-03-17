import { ScrollArea } from '@/Components/ui/scroll-area';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface ChatInterfaceProps {
    messages: Message[];
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleKeyPress: (event: React.KeyboardEvent<Element>) => void;
    handleSendMessage: () => void;
    messagesContainerRef: React.RefObject<HTMLDivElement>;
    handleImageSelect: (url: string | null) => void;
}

export const ChatInterface = ({
    messages,
    newMessage,
    setNewMessage,
    handleKeyPress,
    handleSendMessage,
    messagesContainerRef,
    handleImageSelect,
}: ChatInterfaceProps) => (
    <div className="flex h-full flex-col">
        <div className="relative flex-1">
            <ScrollArea className="h-[calc(100vh-13rem)]">
                <div ref={messagesContainerRef} className="p-4">
                    <div className="flex flex-col space-y-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>

        <MessageInput
            value={newMessage}
            onChange={setNewMessage}
            onKeyDown={handleKeyPress}
            onSend={handleSendMessage}
            onImageSelect={handleImageSelect}
        />
    </div>
);
