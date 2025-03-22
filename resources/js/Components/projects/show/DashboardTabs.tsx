import { TabsList, TabsTrigger } from '@/Components/ui/tabs';
import React from 'react';

interface TabItem {
    value: string;
    label: string;
}

interface DashboardTabsProps {
    onTabChange: (value: string) => void;
    tabs?: TabItem[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
    onTabChange,
    tabs = [
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'members', label: 'Members' },
        { value: 'issues', label: 'Create Issue' },
        { value: 'assigned', label: 'Assigned Issues' },
        { value: 'leaderboard', label: 'Leaderboard' },
    ],
}) => {
    return (
        <TabsList className="mb-6 w-full justify-start rounded-lg bg-muted/50 p-1">
            <div className="flex items-center overflow-x-auto">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className="dark:data-[state=active]:bg-primary-800 text-black data-[state=active]:bg-accent data-[state=active]:shadow-sm dark:text-white"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </div>
        </TabsList>
    );
};

export default DashboardTabs;
