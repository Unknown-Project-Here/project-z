import { OnboardingItem } from '@/components/onboarding/types';

export const domains: Record<string, OnboardingItem[]> = {
    'Web Technologies': [
        {
            name: 'Frontend Development',
            icon: '🎨',
        },
        { name: 'Backend Development', icon: '⚙️' },
        {
            name: 'Full Stack Development',
            icon: '🛠',
        },
        { name: 'Progressive Web Apps', icon: '📱' },
        { name: 'JAMstack', icon: '🍯' },
    ],
    'Cloud & Infrastructure': [
        { name: 'AWS', icon: '☁️' },
        { name: 'Azure', icon: '🌥' },
        { name: 'Google Cloud', icon: '☁️', logo: '/icons/googlecloud.svg' },
        { name: 'Kubernetes', icon: '🚢', logo: '/icons/kubernetes.svg' },
        { name: 'Docker', icon: '🐳', logo: '/icons/docker.svg' },
    ],
    'Data & Analytics': [
        { name: 'Data Science', icon: '📊' },
        {
            name: 'Machine Learning',
            icon: '🤖',
        },
        { name: 'Big Data', icon: '📈' },
        {
            name: 'Data Engineering',
            icon: '🔧',
        },
        {
            name: 'Business Intelligence',
            icon: '📉',
        },
    ],
    'Mobile & Desktop': [
        { name: 'iOS Development', icon: '🍎', logo: '/icons/apple.svg' },
        { name: 'Android Development', icon: '🤖', logo: '/icons/android.svg' },
        {
            name: 'Cross-Platform Mobile',
            icon: '📱',
        },
        {
            name: 'Desktop Applications',
            icon: '💻',
        },
        {
            name: 'Game Development',
            icon: '🎮',
            logo: '/icons/gamedeveloper.svg',
        },
    ],
};
