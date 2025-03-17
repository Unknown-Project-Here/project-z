import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onSend: () => void;
    onImageSelect: (url: string | null) => void;
}

export const MessageInput = ({
    value,
    onChange,
    onKeyDown,
    onSend,
    onImageSelect,
}: MessageInputProps) => (
    <div className="border-t bg-white p-4">
        <div className="relative flex items-center space-x-2">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message..."
                className="h-10 flex-1 rounded-full bg-gray-100 pl-4 pr-[130px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
            <ImageUploader onImageSelect={onImageSelect} />

            <Button
                onClick={onSend}
                className="absolute right-1 h-8 rounded-full"
            >
                Send
                <SendIcon className="h-4 w-4" />
            </Button>
        </div>
    </div>
);
