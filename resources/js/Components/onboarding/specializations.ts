import { OnboardingItem } from '@/Components/onboarding/types';

export const specializations: Record<string, OnboardingItem[]> = {
    Development: [
        {
            name: 'Frontend Developer',
            icon: '🎨',
        },
        {
            name: 'Backend Developer',
            icon: '⚙️',
        },
        {
            name: 'Full Stack Developer',
            icon: '🛠',
        },
        { name: 'Mobile Developer', icon: '📱' },
        { name: 'Game Developer', icon: '🎮' },
    ],
    'DevOps & Infrastructure': [
        { name: 'DevOps Engineer', icon: '🚀' },
        {
            name: 'Site Reliability Engineer',
            icon: '🔧',
        },
        {
            name: 'Cloud Architect',
            icon: '☁️',
        },
        {
            name: 'System Administrator',
            icon: '💻',
        },
        { name: 'Security Engineer', icon: '🔒' },
    ],
    'Data & Analytics': [
        {
            name: 'Data Scientist',
            icon: '📊',
        },
        { name: 'Data Engineer', icon: '🔨' },
        {
            name: 'Machine Learning Engineer',
            icon: '🤖',
        },
        {
            name: 'Business Intelligence Analyst',
            icon: '📈',
        },
        { name: 'Data Analyst', icon: '📉' },
    ],
    'Design & UX': [
        { name: 'UX Designer', icon: '🎯' },
        { name: 'UI Designer', icon: '🎨' },
        {
            name: 'Product Designer',
            icon: '💡',
        },
        {
            name: 'Interaction Designer',
            icon: '🖱',
        },
        {
            name: 'Graphic Designer',
            icon: '👁',
        },
    ],
};
