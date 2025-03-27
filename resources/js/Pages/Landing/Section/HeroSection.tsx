import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { GradientText } from '../Common/GradientText';

export function HeroSection() {
    return (
        <section className="mx-auto max-w-6xl px-6 pt-32 text-center" id="hero">
            <AvatarStack />
            <HeroContent />
            <AppPreview />
            <DecorativeElements />
        </section>
    );
}

function AvatarStack() {
    const avatars = [
        'https://randomuser.me/api/portraits/women/24.jpg',
        'https://randomuser.me/api/portraits/men/22.jpg',
        'https://randomuser.me/api/portraits/women/26.jpg',
        'https://randomuser.me/api/portraits/men/29.jpg',
    ];

    return (
        <div className="flex justify-center pb-6">
            <Badge className="flex w-fit bg-zinc-600/50 p-2">
                <div className="flex items-center gap-2">
                    <div className="flex justify-center -space-x-2">
                        {avatars.map((url, index) => (
                            <Avatar
                                key={index}
                                className="h-6 w-6 border-2 border-white"
                            >
                                <AvatarImage src={url} />
                                <AvatarFallback>U{index + 1}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <p className="text-sm text-zinc-300">
                        Join thousands of developers building and growing
                        together
                    </p>
                </div>
            </Badge>
        </div>
    );
}

function HeroContent() {
    return (
        <div className="mt-4 flex flex-col items-center justify-center">
            <h4 className="mb-6 text-3xl font-bold md:text-5xl">
                Project collaboration, <GradientText>Simplified</GradientText>
            </h4>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-400">
                Experience seamless project management with real-time
                collaboration and powerful integrations built for developers.
            </p>
        </div>
    );
}

function AppPreview() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="relative flex h-[400px] items-center justify-center">
                <PreviewImage
                    position="left"
                    imageUrl="/path-to-your-app-screenshot1.png"
                />
                <PreviewImage
                    position="center"
                    imageUrl="/storage/landing-images/projects.png"
                />
                <PreviewImage
                    position="right"
                    imageUrl="/path-to-your-app-screenshot3.png"
                />
            </div>
        </div>
    );
}

interface PreviewImageProps {
    position: 'left' | 'center' | 'right';
    imageUrl: string;
}

function PreviewImage({ position, imageUrl }: PreviewImageProps) {
    const positionStyles = {
        left: 'left-[5%] rotate-[-5deg] hover:rotate-[-10deg]',
        center: 'z-20 w-[600px] ring-8 ring-zinc-700',
        right: 'right-[5%] rotate-[5deg] hover:rotate-[10deg]',
    };

    const baseStyles =
        'absolute aspect-[16/9] w-[500px] transform overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 shadow-2xl transition-transform duration-500 hover:scale-105';

    return (
        <div className={`${baseStyles} ${positionStyles[position]}`}>
            <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
        </div>
    );
}

function DecorativeElements() {
    return (
        <>
            <div className="absolute left-0 top-1/2 -z-10 h-1/2 w-full bg-gradient-to-t from-zinc-900 to-transparent" />
            <div className="absolute -top-40 left-1/2 h-40 w-full -translate-x-1/2 bg-indigo-500/10 blur-[100px]" />
            <div className="absolute -top-40 left-1/3 h-40 w-full -translate-x-1/2 bg-purple-500/10 blur-[100px]" />
        </>
    );
}
