/* eslint-disable @typescript-eslint/no-explicit-any */
import ApplicationsList from '@/Components/applications/ApplicationsList';
import { AssignedIssues } from '@/Components/projects/show/AssignedIssues';
import ConfigurationBanner from '@/Components/projects/show/Configuration/components/ConfigurationBanner';
import DashboardStats from '@/Components/projects/show/DashboardStats';
import IssueCreator from '@/Components/projects/show/IssueCreator';
import Leaderboard from '@/Components/projects/show/Leaderboard';
import MembersList from '@/Components/projects/show/MembersList';
import ProjectDashboardTabHelper from '@/Components/projects/show/ProjectDashboardTabHelper';
import { TabsContent } from '@/Components/ui/tabs';
import { ActiveTab, Project } from '@/types';
import { router } from '@inertiajs/react';
import InviteUser from './InviteUser';
import MemberApplication from './MemberApplication';

interface ProjectDashboardProps {
    activeTab: ActiveTab;
    activeSection?: MemberSection;
    project: Project;
    applicationsData?: {
        applications: any[];
        canManageApplications: boolean;
    };
}
type MemberSection = 'view-applications' | 'invite' | 'application' | null;

function ProjectDashboard({
    activeTab,
    project,
    activeSection,
}: ProjectDashboardProps) {
    const handleTabChange = (tab: ActiveTab) => {
        router.visit(
            route('projects.show', { project: project.id, activeTab: tab }),
        );
    };

    return (
        <div className="container mx-auto px-4 py-2">
            <ProjectDashboardTabHelper
                activeTab={activeTab}
                onTabChange={handleTabChange}
            >
                {project.must_configure && <ConfigurationBanner />}

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
                    {(() => {
                        switch (activeSection) {
                            case 'view-applications':
                                return <ApplicationsList />;
                            case 'invite':
                                return <InviteUser />;
                            case 'application':
                                return <MemberApplication />;
                            default:
                                return <MembersList />;
                        }
                    })()}
                </TabsContent>

                <TabsContent value="assigned" className="mt-4">
                    <AssignedIssues fullView />
                </TabsContent>

                <TabsContent value="leaderboard" className="mt-4">
                    <Leaderboard fullView />
                </TabsContent>
            </ProjectDashboardTabHelper>
        </div>
    );
}

export default ProjectDashboard;
