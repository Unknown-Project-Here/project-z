import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { SectionBadge } from '../Common/SectionBadge';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: 'Project Hub has transformed how our team collaborates. The gamification features keep everyone engaged.',
            author: 'Sarah Chen',
            role: 'Engineering Lead',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            quote: 'The open-source nature means we can customize it exactly how we need it. Game changer!',
            author: 'Marcus Rodriguez',
            role: 'Tech Lead',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
    ];

    return (
        <section
            className="mx-auto max-w-6xl px-6 pb-20 pt-[120px]"
            id="testimonials"
        >
            <SectionBadge>TESTIMONIALS</SectionBadge>
            <h2 className="mb-16 text-center text-3xl font-bold md:text-5xl">
                Built for Teams Like Yours
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
        </section>
    );
}

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

function TestimonialCard({
    quote,
    author,
    role,
    avatar,
}: TestimonialCardProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <p className="mb-6 text-lg text-zinc-300">"{quote}"</p>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{author[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{author}</p>
                    <p className="text-sm text-zinc-400">{role}</p>
                </div>
            </div>
        </div>
    );
}
