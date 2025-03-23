import { TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { ActiveTab } from '@/types';
import React from 'react';

interface TabItem {
    value: ActiveTab;
    label: string;
}

interface DashboardTabsProps {
    tabs?: TabItem[];
    onTabChange: (value: ActiveTab) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
    tabs = [
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'members', label: 'Members' },
        { value: 'issues', label: 'Create Issue' },
        { value: 'assigned', label: 'Assigned Issues' },
        { value: 'leaderboard', label: 'Leaderboard' },
    ],
    onTabChange,
}) => {
    return (
        <TabsList className="w-full justify-start rounded-lg bg-muted/50 p-1">
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
