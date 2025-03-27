import { Button } from '@/Components/ui/button';
import { SheetTrigger } from '@/Components/ui/sheet';
import { CogIcon } from 'lucide-react';

export function ManagerToggleButton() {
    return (
        <SheetTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-1 top-1"
            >
                <CogIcon className="size-2" />
            </Button>
        </SheetTrigger>
    );
}
