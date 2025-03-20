import { Tabs, TabsContent } from '@/Components/ui/tabs';
import { useState } from 'react';
import AssignedIssues from './AssignedIssues';
import DashboardStats from './DashboardStats';
import DashboardTabs from './DashboardTabs';
import IssueCreator from './IssueCreator';
import Leaderboard from './Leaderboard';
import MembersList from './MembersList';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="to-primary/950 dark:from-primary-950 dark:to-primary-900 min-h-screen bg-gradient-to-b from-primary/50">
            <div className="container mx-auto px-4 py-2">
                <Tabs
                    defaultValue="dashboard"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <DashboardTabs onTabChange={setActiveTab} />

                    <TabsContent value="dashboard" className="mt-0">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <DashboardStats />
                            <AssignedIssues />
                            <Leaderboard />
                        </div>
                    </TabsContent>

                    <TabsContent value="issues" className="mt-0">
                        <IssueCreator />
                    </TabsContent>

                    <TabsContent value="members" className="mt-0">
                        <MembersList />
                    </TabsContent>

                    <TabsContent value="assigned" className="mt-0">
                        <AssignedIssues fullView />
                    </TabsContent>

                    <TabsContent value="leaderboard" className="mt-0">
                        <Leaderboard fullView />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Dashboard;
