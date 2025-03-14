import { OnboardingItem } from '@/Components/onboarding/types';

export const frameworks: Record<string, OnboardingItem[]> = {
    JavaScript: [
        { name: 'React', icon: '⚛️', logo: '/icons/react.svg' },
        { name: 'Vue.js', icon: '💚', logo: '/icons/vuedotjs.svg' },
        { name: 'Angular', icon: '🔺', logo: '/icons/angular.svg' },
        { name: 'Svelte', icon: '🔥', logo: '/icons/svelte.svg' },
        { name: 'Next.js', icon: '▲', logo: '/icons/nextdotjs.svg' },
        { name: 'Ember.js', icon: '▲', logo: '/icons/emberdotjs.svg' },
        { name: 'Backbone.js', icon: '🔗', logo: '/icons/backbonedotjs.svg' },
        { name: 'Nuxt.js', icon: '🌐', logo: '/icons/nuxt.svg' },
        { name: 'Remix', icon: '🌐', logo: '/icons/remix.svg' },
        { name: 'SolidJS', icon: '🌐', logo: '/icons/solid.svg' },
    ],
    Python: [
        { name: 'Django', icon: '🎸', logo: '/icons/django.svg' },
        { name: 'Flask', icon: '🌶️', logo: '/icons/flask.svg' },
        { name: 'FastAPI', icon: '⚡️', logo: '/icons/fastapi.svg' },
    ],
    Ruby: [
        { name: 'Ruby on Rails', icon: '🛤️', logo: '/icons/rubyonrails.svg' },
        { name: 'Sinatra', icon: '🎵', logo: '/icons/rubysinatra.svg' },
    ],
    PHP: [
        { name: 'Laravel', icon: '🔷', logo: '/icons/laravel.svg' },
        { name: 'Symfony', icon: '🎼', logo: '/icons/symfony.svg' },
    ],
    Java: [
        { name: 'Spring', icon: '🌱', logo: '/icons/spring.svg' },
        { name: 'Hibernate', icon: '❄️', logo: '/icons/hibernate.svg' },
    ],
    '.NET': [{ name: 'ASP.NET Core', icon: '🔷', logo: '/icons/dotnet.svg' }],
};
