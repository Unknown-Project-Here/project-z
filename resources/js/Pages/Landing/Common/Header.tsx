import { Button } from '@/Components/ui/button';
import { useScroll } from '@/hooks/useScroll';
import { FeatherIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
    return (
        <header className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-zinc-800 bg-zinc-900/90 px-6 py-4 backdrop-blur-sm">
            <Logo />
            <Navigation />
            <WaitlistButton />
        </header>
    );
}

function Logo() {
    return (
        <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => {
                window.location.href = '/';
            }}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                <FeatherIcon name="logo" className="h-5 w-5 text-zinc-100" />
            </div>
            <span className="text-xl font-semibold">Project Hub</span>
        </div>
    );
}

function Navigation() {
    const [activeHash, setActiveHash] = useState('');
    const { scrollToElement } = useScroll();

    const links = [
        { href: '#hero', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How it Works' },
        { href: '#testimonials', label: 'Testimonials' },
    ];

    useEffect(() => {
        // Update active hash on mount and scroll
        const updateActiveHash = () => {
            const sections = links.map((link) => ({
                id: link.href.replace('#', ''),
                element: document.getElementById(link.href.replace('#', '')),
            }));

            const currentSection = sections.find((section) => {
                if (!section.element) return false;
                const rect = section.element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            setActiveHash(currentSection ? `#${currentSection.id}` : '');
        };

        // Set initial hash
        updateActiveHash();

        // Listen for scroll and hash changes
        window.addEventListener('scroll', updateActiveHash);
        window.addEventListener('hashchange', updateActiveHash);

        return () => {
            window.removeEventListener('scroll', updateActiveHash);
            window.removeEventListener('hashchange', updateActiveHash);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <nav className="hidden items-center gap-8 md:flex">
            {links.map(({ href, label }) => (
                <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(href);
                    }}
                    className={`text-sm ${
                        href === activeHash ? 'text-zinc-100' : 'text-zinc-400'
                    } transition-colors hover:text-zinc-100`}
                >
                    {label}
                </a>
            ))}
        </nav>
    );
}

function WaitlistButton() {
    const { scrollToElement } = useScroll();

    return (
        <Button
            variant="outline"
            className="rounded-full border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
            onClick={() => {
                scrollToElement('#waitlist');
            }}
        >
            Join the Waitlist
        </Button>
    );
}
