import { Badge } from '@/Components/ui/badge';

interface SectionBadgeProps {
    children: React.ReactNode;
}

export function SectionBadge({ children }: SectionBadgeProps) {
    return (
        <div className="flex justify-center pb-6">
            <Badge className="flex w-fit bg-zinc-600/50 px-4 py-1 text-white">
                {children}
            </Badge>
        </div>
    );
}
