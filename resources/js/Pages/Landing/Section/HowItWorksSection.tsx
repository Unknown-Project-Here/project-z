import { GradientText } from '../Common/GradientText';
import { SectionBadge } from '../Common/SectionBadge';

export function HowItWorksSection() {
    const features = [
        {
            icon: '🎖',
            title: 'Achievements',
            description:
                'Unlock custom badges and rewards as you hit key milestones. Track your progress through different achievement tiers, from Bronze to Diamond, and showcase your expertise in specific areas like code reviews, documentation, and team collaboration.',
            image: '/path-to-achievements-image.png',
        },
        {
            icon: '📊',
            title: 'Progress Tracking',
            description:
                'Watch your skills grow with detailed progress analytics. Track your development across multiple domains, set personal goals, and receive tailored recommendations for skill improvement. Visualize your journey with interactive charts and milestone markers.',
            image: '/path-to-progress-image.png',
        },
        {
            icon: '🏆',
            title: 'Leaderboards',
            description:
                'Compete in weekly and monthly challenges with customizable team leaderboards. Earn points for code quality, collaboration, and project completion. Celebrate team victories with special rewards and recognition for top contributors.',
            image: '/path-to-leaderboard-image.png',
        },
    ];

    return (
        <section
            className="mx-auto max-w-6xl px-6 pb-20 pt-[120px]"
            id="how-it-works"
        >
            <SectionBadge>GAMIFY YOUR WORKFLOW</SectionBadge>
            <h2 className="mb-16 text-center text-3xl font-bold md:text-5xl">
                Make work feel like <GradientText>Fun</GradientText>
            </h2>
            <FeatureList features={features} />
        </section>
    );
}

interface Feature {
    icon: string;
    title: string;
    description: string;
    image: string;
}

function FeatureList({ features }: { features: Feature[] }) {
    return (
        <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
                <FeatureCard
                    key={feature.title}
                    {...feature}
                    reverse={index % 2 === 1}
                />
            ))}
        </div>
    );
}

interface FeatureCardProps extends Feature {
    reverse?: boolean;
}

function FeatureCard({
    icon,
    title,
    description,
    image,
    reverse,
}: FeatureCardProps) {
    return (
        <div
            className={`flex flex-col gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-800/50 md:flex-row ${
                reverse ? 'md:flex-row-reverse' : ''
            }`}
        >
            <div className="relative flex flex-1 flex-col justify-center">
                <div className="absolute -left-24 -top-20 opacity-10">
                    <div className="flex h-[20rem] w-[20rem] rotate-6 items-center justify-center rounded-full bg-zinc-800 text-[12rem]">
                        {icon}
                    </div>
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                <p className="text-lg text-zinc-400">{description}</p>
            </div>
            <div className="flex-1">
                <div className="aspect-video overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${image})`,
                            opacity: 0.9,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
