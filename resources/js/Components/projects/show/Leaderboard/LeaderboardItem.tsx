import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Contributor, getRankBadgeClasses } from '../utils/leaderboardUtils';

interface LeaderboardItemProps {
    contributor: Contributor;
}

export function LeaderboardItem({ contributor }: LeaderboardItemProps) {
    return (
        <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-primary/5 dark:hover:bg-primary/10">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${getRankBadgeClasses(contributor.rank)}`}
                >
                    {contributor.rank}
                </div>
                <Avatar className="h-10 w-10 border-2 border-primary/10 bg-primary/5">
                    <AvatarImage
                        src={contributor.avatar}
                        alt={contributor.name}
                    />
                    <AvatarFallback className="bg-primary/5 text-primary">
                        {contributor.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-sm font-medium text-foreground">
                        {contributor.name}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-[hsl(var(--primary))]">
                    {contributor.contributions}
                </div>
                <div className="text-xs">contributions</div>
            </div>
        </div>
    );
}
