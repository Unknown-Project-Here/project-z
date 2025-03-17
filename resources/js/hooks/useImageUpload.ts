import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UseImageUploadReturn {
    selectedImage: string | null;
    imageFile: File | null;
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendImage: () => void;
    handleRemoveImage: () => void;
}

export const useImageUpload = (
    onImageSelect: (url: string | null) => void,
): UseImageUploadReturn => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setImageFile(file);
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSendImage = () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            router.post('/messages/upload-image', formData, {
                onSuccess: (page) => {
                    const imageUrl = page?.props?.flash?.imageUrl;

                    if (imageUrl) {
                        onImageSelect(imageUrl);
                        handleRemoveImage();
                    }
                },
                onError: () => {
                    toast.error('Failed to upload image');
                },
            });
        }
    };

    const handleRemoveImage = () => {
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
        }
        setSelectedImage(null);
        setImageFile(null);
        onImageSelect(null);
    };

    return {
        selectedImage,
        imageFile,
        handleImageSelect,
        handleSendImage,
        handleRemoveImage,
    };
};
