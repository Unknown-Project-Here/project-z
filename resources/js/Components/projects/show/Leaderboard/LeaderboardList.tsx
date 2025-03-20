import { Contributor } from '../utils/leaderboardUtils';
import { LeaderboardItem } from './LeaderboardItem';

interface LeaderboardListProps {
    contributors: Contributor[];
    fullView: boolean;
}

export function LeaderboardList({
    contributors,
    fullView,
}: LeaderboardListProps) {
    const displayContributors = fullView
        ? contributors
        : contributors.slice(0, 5);

    return (
        <div className="space-y-4">
            {displayContributors.map((contributor) => (
                <LeaderboardItem
                    key={contributor.name}
                    contributor={contributor}
                />
            ))}

            {!fullView && contributors.length > 5 && (
                <a
                    href="#"
                    className="flex items-center justify-center rounded-md p-2 text-sm text-[hsl(var(--primary))] hover:bg-primary/5 hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    View all {contributors.length} contributors
                </a>
            )}
        </div>
    );
}
