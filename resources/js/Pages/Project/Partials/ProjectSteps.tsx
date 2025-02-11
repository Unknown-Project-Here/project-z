import ExpertiseStep from '@/components/onboarding/ExpertiseStep';
import FrameworksStep from '@/components/onboarding/FrameworksStep';
import LanguagesStep from '@/components/onboarding/LanguagesStep';
import RolesStep from '@/components/onboarding/RolesStep';
import TechStackStep from '@/components/onboarding/TechStackStep';
import ProjectDetails from './ProjectDetails';

export const projectSteps = [
    {
        title: 'Project Details',
        description: 'What is your project about?',
        field: 'projectDetails',
        component: ProjectDetails,
    },
    {
        title: 'Tech Stack',
        description: 'What technologies would you use for this project?',
        field: 'techStack',
        component: TechStackStep,
    },
    {
        title: 'Languages',
        description: 'Which programming languages would your project utilize?',
        field: 'languages',
        component: LanguagesStep,
    },
    {
        title: 'Frameworks',
        description: 'What frameworks or libraries would you like to use?',
        field: 'frameworks',
        component: FrameworksStep,
    },
    {
        title: 'Expertise',
        description:
            'What is the level of expertise required for this project?',
        field: 'expertise',
        component: ExpertiseStep,
    },
    {
        title: 'Roles',
        description: 'What roles does your project need?',
        field: 'roles',
        component: RolesStep,
    },
];
