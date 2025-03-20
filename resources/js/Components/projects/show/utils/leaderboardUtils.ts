export interface Contributor {
    name: string;
    avatar: string;
    contributions: number;
    rank: number;
}

export const getMockContributors = (): Contributor[] => [
    {
        name: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Alex Johnson',
        contributions: 127,
        rank: 1,
    },
    {
        name: 'Sarah Miller',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah Miller',
        contributions: 118,
        rank: 2,
    },
    {
        name: 'David Chen',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=David Chen',
        contributions: 105,
        rank: 3,
    },
    {
        name: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Emma Wilson',
        contributions: 92,
        rank: 4,
    },
    {
        name: 'James Taylor',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=James Taylor',
        contributions: 87,
        rank: 5,
    },
    {
        name: 'Christopher Nolan',
        avatar: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Christopher Nolan',
        contributions: 20,
        rank: 6,
    },
];

export const getRankBadgeClasses = (rank: number): string => {
    if (rank === 1)
        return 'from-[hsl(var(--chart-1))] to-[hsl(var(--chart-1))]/70';
    if (rank === 2)
        return 'from-[hsl(var(--chart-2))] to-[hsl(var(--chart-2))]/70';
    if (rank === 3)
        return 'from-[hsl(var(--chart-3))] to-[hsl(var(--chart-3))]/70';
    return 'from-muted/60 to-muted/30';
};
