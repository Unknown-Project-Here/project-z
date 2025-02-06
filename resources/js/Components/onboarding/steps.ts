import ExpertiseStep from '@/components/onboarding/ExpertiseStep';
import FrameworksStep from '@/components/onboarding/FrameworksStep';
import LanguagesStep from '@/components/onboarding/LanguagesStep';
import RolesStep from '@/components/onboarding/RolesStep';
import TechStackStep from '@/components/onboarding/TechStackStep';

export const steps = [
    {
        title: 'Tech Stack',
        description: 'What technologies do you work with?',
        field: 'techStack',
        component: TechStackStep,
    },
    {
        title: 'Languages',
        description: 'Which programming languages do you use?',
        field: 'languages',
        component: LanguagesStep,
    },
    {
        title: 'Frameworks',
        description: 'What frameworks or libraries are you familiar with?',
        field: 'frameworks',
        component: FrameworksStep,
    },
    {
        title: 'Expertise',
        description: 'How would you rate your expertise?',
        field: 'expertise',
        component: ExpertiseStep,
    },
    {
        title: 'Roles',
        description: 'What roles best describe you?',
        field: 'roles',
        component: RolesStep,
    },
];
