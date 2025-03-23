import AssignedIssues from '@/Components/projects/show/AssignedIssues';
import ConfigurationBanner from '@/Components/projects/show/Configuration/components/ConfigurationBanner';
import DashboardStats from '@/Components/projects/show/DashboardStats';
import DashboardTabs from '@/Components/projects/show/DashboardTabs';
import IssueCreator from '@/Components/projects/show/IssueCreator';
import Leaderboard from '@/Components/projects/show/Leaderboard';
import MembersList from '@/Components/projects/show/MembersList';
import { Tabs, TabsContent } from '@/Components/ui/tabs';
import { useProjectProps } from '@/hooks/useProjectProps';
import { ActiveTab } from '@/types';
import { router } from '@inertiajs/react';

function ProjectDashboard({ activeTab }: { activeTab: ActiveTab }) {
    const projectProps = useProjectProps();

    const handleTabChange = (tab: ActiveTab) => {
        router.visit(
            route('projects.show', { project: projectProps.id, page: tab }),
        );
    };

    return (
        <div className="to-primary/950 dark:from-primary-950 dark:to-primary-900 min-h-screen bg-gradient-to-b from-primary/50">
            <div className="container mx-auto px-4 py-2">
                <Tabs
                    defaultValue="dashboard"
                    value={activeTab}
                    className="w-full"
                >
                    <DashboardTabs onTabChange={handleTabChange} />

                    {projectProps.must_configure && <ConfigurationBanner />}

                    <TabsContent value="dashboard" className="mt-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <DashboardStats />
                            <AssignedIssues />
                            <Leaderboard />
                        </div>
                    </TabsContent>

                    <TabsContent value="issues" className="mt-4">
                        <IssueCreator />
                    </TabsContent>

                    <TabsContent value="members" className="mt-4">
                        <MembersList />
                    </TabsContent>

                    <TabsContent value="assigned" className="mt-4">
                        <AssignedIssues fullView />
                    </TabsContent>

                    <TabsContent value="leaderboard" className="mt-4">
                        <Leaderboard fullView />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default ProjectDashboard;
