import { SectionBadge } from '../Common/SectionBadge';

export function FeaturesSection() {
    const features = [
        {
            icon: '🚀',
            title: 'Transparency',
            description:
                'Real-time visibility into team progress and project status',
        },
        {
            icon: '🛠',
            title: 'Customization',
            description:
                "Tailor workflows and processes to match your team's needs",
        },
        {
            icon: '🌍',
            title: 'Community',
            description:
                'Join a thriving ecosystem of developers building together',
        },
    ];

    return (
        <section
            className="mx-auto max-w-6xl px-6 pb-20 pt-[120px] text-center"
            id="features"
        >
            <SectionBadge>WHY CHOOSE US</SectionBadge>
            <h4 className="mb-6 text-3xl font-bold md:text-5xl">
                The Power of Open-Source Collaboration
            </h4>
            <p className="mx-auto mb-12 w-full max-w-4xl text-xl text-zinc-400">
                Built by teams, for teams. Experience the power of transparent,
                customizable, and community-driven project management.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
}

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500 hover:bg-zinc-800/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <div className="mb-4 text-4xl">{icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </div>
    );
}
