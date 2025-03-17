import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImagePlus, SendIcon, X } from 'lucide-react';

interface ImageUploaderProps {
    onImageSelect: (url: string | null) => void;
}

export const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
    const {
        selectedImage,
        handleImageSelect,
        handleSendImage,
        handleRemoveImage,
    } = useImageUpload(onImageSelect);

    return (
        <div className="absolute right-24">
            {!selectedImage ? (
                <div className="flex items-center">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="ghost"
                            className="h-8 w-fit cursor-pointer p-2 hover:bg-gray-200"
                            asChild
                        >
                            <div className="flex items-center">
                                <ImagePlus className="h-6 w-6 text-primary" />
                            </div>
                        </Button>
                    </label>
                </div>
            ) : (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="relative max-w-2xl rounded-md border border-border bg-background p-4">
                            <img
                                src={selectedImage}
                                alt="Selected image"
                                className="max-h-[80vh] w-auto rounded object-contain"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-background"
                                onClick={handleRemoveImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <div className="mt-4 flex w-full justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={handleRemoveImage}
                                    className="w-full"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSendImage}
                                    className="w-full"
                                >
                                    Send
                                    <SendIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
