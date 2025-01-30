import { Code, GitBranch, Rocket, Users } from 'lucide-react';

const features = [
    {
        icon: <Code className="h-6 w-6" />,
        title: 'Find Projects',
        description:
            'Discover exciting coding projects that match your skills and interests.',
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: 'Connect with Developers',
        description:
            'Build your network and collaborate with talented developers from around the world.',
    },
    {
        icon: <Rocket className="h-6 w-6" />,
        title: 'Manage Projects',
        description:
            'Powerful tools to organize tasks, track progress, and streamline your workflow.',
    },
    {
        icon: <GitBranch className="h-6 w-6" />,
        title: 'Version Control',
        description:
            'Seamless integration with popular version control systems for efficient collaboration.',
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="bg-white px-4 py-20 dark:bg-gray-800 sm:px-6 lg:px-8"
        >
            <div className="container mx-auto">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Powerful Features for Developers
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-700"
                        >
                            <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
