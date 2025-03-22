import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
    <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(231.4,30%,92%)] via-[hsl(264.7,35%,88%)] to-[hsl(325.5,40%,85%)] p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 dark:from-[hsl(231.4,15.3%,16.4%)] dark:via-[hsl(264.7,20%,18%)] dark:to-[hsl(325.5,25%,20%)] dark:hover:shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-50 dark:opacity-30" />
        <div className="relative">
            <div className="text-sm font-medium">{title}</div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
        </div>
    </div>
);

interface DashboardStatsProps {
    totalIssues?: number;
    openIssues?: number;
    teamMembers?: number;
    p0Issues?: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
    totalIssues = 24,
    openIssues = 12,
    teamMembers = 8,
    p0Issues = 3,
}) => {
    return (
        <>
            <StatCard title="Total Issues" value={totalIssues} />
            <StatCard title="Open Issues" value={openIssues} />
            <StatCard title="Team Members" value={teamMembers} />
            <StatCard title="P0 Issues" value={p0Issues} />
        </>
    );
};

export default DashboardStats;
