import { Button } from '@/Components/ui/button';
import { Save } from 'lucide-react';

interface SaveButtonProps {
    onSave: () => void;
}

export function SaveButton({ onSave }: SaveButtonProps) {
    return (
        <Button onClick={onSave} className="mt-4 w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Form Configuration
        </Button>
    );
}
