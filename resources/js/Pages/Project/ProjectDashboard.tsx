/* eslint-disable @typescript-eslint/no-explicit-any */
import ApplicationsList from '@/Components/applications/ApplicationsList';
import { AssignedIssues } from '@/Components/projects/show/AssignedIssues';
import AssignedIssuesFullView from '@/Components/projects/show/AssignedIssuesFullView';
import ConfigurationBanner from '@/Components/projects/show/Configuration/components/ConfigurationBanner';
import DashboardButtonCarousel from '@/Components/projects/show/DashboardButtonCarousel';
import DashboardStats from '@/Components/projects/show/DashboardStats';
import Leaderboard from '@/Components/projects/show/Leaderboard';
import { MembersList } from '@/Components/projects/show/MembersList';
import ProjectDashboardTabHelper from '@/Components/projects/show/ProjectDashboardTabHelper';
import { TabsContent } from '@/Components/ui/tabs';
import Heading from '@/Components/ui/typography/Heading';
import { ActiveTab, Project } from '@/types';
import { router } from '@inertiajs/react';
import { BlockList } from './BlockList';
import ConfigureRequestQuestions from './Configure/ConfigureRequestQuestions';
import InviteUser from './InviteUser';
import LeaveProjectDialog from './LeaveProjectDialog';
import MemberApplication from './MemberApplication';

interface ProjectDashboardProps {
    activeTab: ActiveTab;
    activeSection?: MemberSection | DashboardSection | IssuesSection;
    project: Project;
    applicationsData?: {
        applications: any[];
        canManageApplications: boolean;
    };
}
type MemberSection =
    | 'view-applications'
    | 'invite'
    | 'application'
    | 'blocklist'
    | null;
type DashboardSection = 'configure-questions' | null;
type IssuesSection = 'assigned' | null;

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
                    {(() => {
                        switch (activeSection) {
                            case 'configure-questions':
                                return <ConfigureRequestQuestions />;
                            default:
                                return (
                                    <>
                                        <DashboardButtonCarousel />
                                        <Heading level={3}>Dashboard</Heading>
                                        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                            <DashboardStats />
                                            <AssignedIssues />
                                            <Leaderboard />
                                        </div>
                                    </>
                                );
                        }
                    })()}
                </TabsContent>

                <TabsContent value="issues" className="mt-4">
                    {(() => {
                        switch (activeSection) {
                            default:
                                return <AssignedIssuesFullView />;
                        }
                    })()}
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
                            case 'blocklist':
                                return <BlockList />;
                            default:
                                return <MembersList />;
                        }
                    })()}
                </TabsContent>

                <TabsContent value="settings" className="mt-4">
                    {(() => {
                        switch (activeSection) {
                            case 'view-applications':
                                return <ApplicationsList />;
                            case 'invite':
                                return <InviteUser />;
                            case 'application':
                                return <MemberApplication />;
                            case 'blocklist':
                                return <BlockList />;
                            default:
                                return <LeaveProjectDialog />;
                        }
                    })()}
                </TabsContent>
            </ProjectDashboardTabHelper>
        </div>
    );
}

export default ProjectDashboard;
