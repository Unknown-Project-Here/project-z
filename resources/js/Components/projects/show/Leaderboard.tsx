import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { LeaderboardList } from './Leaderboard/LeaderboardList';
import { getMockContributors } from './utils/leaderboardUtils';

interface LeaderboardProps {
    fullView?: boolean;
}

export default function Leaderboard({ fullView = false }: LeaderboardProps) {
    const contributors = getMockContributors();

    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-50 dark:opacity-30" />
            <Card className="relative h-full border-0 bg-transparent shadow-none">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                            Leaderboard (placeholder)
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LeaderboardList
                        contributors={contributors}
                        fullView={fullView}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
