import DomainsStep from '@/components/onboarding/DomainsStep';
import ExpertiseStep from '@/components/onboarding/ExpertiseStep';
import FrameworksStep from '@/components/onboarding/FrameworksStep';
import LanguagesStep from '@/components/onboarding/LanguagesStep';
import SpecializationsStep from '@/components/onboarding/SpecializationsStep';
import ProjectDetails from './ProjectDetails';

export const projectSteps = [
    {
        title: 'Project Details',
        description: 'What is your project about?',
        field: 'projectDetails',
        component: ProjectDetails,
    },
    {
        title: 'Domains',
        description: 'What domains does your project belong to?',
        field: 'domains',
        component: DomainsStep,
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
        title: 'Specializations',
        description: 'What specializations does your project need?',
        field: 'specializations',
        component: SpecializationsStep,
    },
];
