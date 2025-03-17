import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface MessageImageProps {
    imageUrl: string;
    className?: string;
}

export const MessageImage = ({ imageUrl, className }: MessageImageProps) => {
    return (
        <Dialog>
            <DialogTrigger>
                <img
                    src={imageUrl}
                    alt="Message attachment"
                    className={cn(
                        'max-h-[200px] w-auto cursor-pointer rounded-md transition-opacity hover:opacity-90',
                        className,
                    )}
                />
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <img
                    src={imageUrl}
                    alt="Message attachment"
                    className="h-auto w-full object-contain"
                />
            </DialogContent>
        </Dialog>
    );
};
