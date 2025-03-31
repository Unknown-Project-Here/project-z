import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { ActiveTab } from '@/types';
import React from 'react';

interface TabItem {
    value: ActiveTab;
    label: string;
}

interface TabHelperProps {
    activeTab: ActiveTab;
    tabs?: TabItem[];
    onTabChange: (tab: ActiveTab) => void;
    children: React.ReactNode;
}

const ProjectDashboardTabHelper: React.FC<TabHelperProps> = ({
    activeTab,
    tabs = [
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'members', label: 'Members' },
        { value: 'issues', label: 'Issues' },
        { value: 'settings', label: 'Settings' },
    ],
    onTabChange,
    children,
}) => {
    return (
        <Tabs value={activeTab} className="w-full">
            <TabsList className="w-full justify-start rounded-lg p-1 dark:bg-black/30">
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
            {children}
        </Tabs>
    );
};

export default ProjectDashboardTabHelper;
