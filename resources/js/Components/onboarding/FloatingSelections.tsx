import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingSelectionsProps {
    items: string[];
    onRemove: (item: string) => void;
    onClearAll: () => void;
    label: string;
}

interface AnimatedItem {
    id: string;
    isExiting: boolean;
}

export function FloatingSelections({
    items = [],
    onRemove,
    onClearAll,
    label,
}: FloatingSelectionsProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState<AnimatedItem[]>([]);

    useEffect(() => {
        if (items.length > 0) {
            setIsVisible(true);
            setAnimatedItems(
                items.map((item) => ({ id: item, isExiting: false })),
            );
        } else {
            setIsVisible(false);
        }
    }, [items]);

    const handleRemove = (itemId: string) => {
        setAnimatedItems((current) =>
            current.map((item) =>
                item.id === itemId ? { ...item, isExiting: true } : item,
            ),
        );

        setTimeout(() => {
            onRemove(itemId);
        }, 50);
    };

    const handleClearAll = () => {
        setAnimatedItems((current) =>
            current.map((item) => ({ ...item, isExiting: true })),
        );

        setTimeout(() => {
            onClearAll();
        }, 50);
    };

    if (!items?.length && !isVisible) return null;

    return (
        <div
            className={`fixed top-[80px] z-50 transition-all duration-300 ease-in-out max-sm:left-1/2 max-sm:w-[90vw] max-sm:-translate-x-1/2 sm:right-4 sm:w-[400px] sm:translate-x-0 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'} `}
        >
            <div className="rounded-lg border bg-background p-4 shadow-lg">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{label}</span>
                        <Badge variant="secondary" className="h-6 px-2">
                            {items.length}
                        </Badge>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearAll}
                        className="hover:text-foreground"
                    >
                        Clear all
                    </Button>
                </div>
                <ScrollArea className="h-[100px]">
                    <div className="flex flex-wrap gap-2">
                        {animatedItems.map((item) => (
                            <Badge
                                key={item.id}
                                variant="secondary"
                                className={`group cursor-pointer select-none px-3 py-1 text-base transition-all duration-300 ease-in-out hover:bg-destructive/10 ${item.isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} `}
                                onClick={() => handleRemove(item.id)}
                            >
                                {item.id}
                                <X className="ml-2 h-4 w-4 group-hover:text-destructive" />
                            </Badge>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
