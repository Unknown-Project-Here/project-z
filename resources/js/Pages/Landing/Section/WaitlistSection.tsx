import { Button } from '@/Components/ui/button';
import { Send } from 'lucide-react';
import { SectionBadge } from '../Common/SectionBadge';

export function WaitlistSection() {
    return (
        <section className="mx-auto max-w-6xl px-6 pb-32" id="waitlist">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center backdrop-blur-sm">
                <SectionBadge>JOIN THE MOVEMENT</SectionBadge>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Be Part of Something Special
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
                    Join our growing community of innovators. Get early access,
                    exclusive updates, and help shape the future of team
                    collaboration.
                </p>
                <EmailSignup />
            </div>
        </section>
    );
}

function EmailSignup() {
    return (
        <div className="relative mx-auto max-w-md">
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-zinc-700 bg-zinc-800/50 px-6 py-3 pr-[140px] text-zinc-100 ring-4 ring-zinc-700 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            />
            <Button className="group absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                Join Now
                <Send className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
