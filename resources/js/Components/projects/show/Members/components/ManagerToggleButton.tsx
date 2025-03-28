import { Button } from '@/Components/ui/button';
import { SheetTrigger } from '@/Components/ui/sheet';
import { CogIcon } from 'lucide-react';

export function ManagerToggleButton() {
    return (
        <SheetTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 border-none hover:bg-gray-400 dark:hover:bg-gray-500"
            >
                <CogIcon className="size-4" />
            </Button>
        </SheetTrigger>
    );
}
