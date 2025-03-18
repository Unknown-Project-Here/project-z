import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Award, Medal, Trophy } from 'lucide-react';

interface LeaderboardProps {
    fullView?: boolean;
}

export function Leaderboard({ fullView = false }: LeaderboardProps) {
    const contributors = [
        {
            name: 'Alex Johnson',
            avatar: '/placeholder.svg?height=40&width=40',
            contributions: 127,
            rank: 1,
        },
        {
            name: 'Sarah Miller',
            avatar: '/placeholder.svg?height=40&width=40',
            contributions: 118,
            rank: 2,
        },
        {
            name: 'David Chen',
            avatar: '/placeholder.svg?height=40&width=40',
            contributions: 105,
            rank: 3,
        },
        {
            name: 'Emma Wilson',
            avatar: '/placeholder.svg?height=40&width=40',
            contributions: 92,
            rank: 4,
        },
        {
            name: 'James Taylor',
            avatar: '/placeholder.svg?height=40&width=40',
            contributions: 87,
            rank: 5,
        },
    ];

    const displayContributors = fullView
        ? contributors
        : contributors.slice(0, 5);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return (
                    <Trophy className="h-5 w-5 text-[hsl(var(--chart-1))]" />
                );
            case 2:
                return <Medal className="h-5 w-5 text-[hsl(var(--chart-2))]" />;
            case 3:
                return <Award className="h-5 w-5 text-[hsl(var(--chart-3))]" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-50 dark:opacity-30" />
            <Card className="relative h-full border-0 bg-transparent shadow-none">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <Trophy className="h-5 w-5 text-[hsl(var(--chart-1))]" />
                        <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                            Leaderboard
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {displayContributors.map((contributor) => (
                            <div
                                key={contributor.name}
                                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-primary/5 dark:hover:bg-primary/10"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                            contributor.rank === 1
                                                ? 'from-[hsl(var(--chart-1))] to-[hsl(var(--chart-1))]/70'
                                                : contributor.rank === 2
                                                  ? 'from-[hsl(var(--chart-2))] to-[hsl(var(--chart-2))]/70'
                                                  : contributor.rank === 3
                                                    ? 'from-[hsl(var(--chart-3))] to-[hsl(var(--chart-3))]/70'
                                                    : 'from-muted/60 to-muted/30'
                                        }`}
                                    >
                                        {getRankIcon(contributor.rank) || (
                                            <span className="text-background">
                                                {contributor.rank}
                                            </span>
                                        )}
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
                                    <div className="text-xs text-muted-foreground">
                                        contributions
                                    </div>
                                </div>
                            </div>
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
                </CardContent>
            </Card>
        </div>
    );
}
