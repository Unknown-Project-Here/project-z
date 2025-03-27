import { useScroll } from '@/hooks/useScroll';
import { FeatherIcon } from 'lucide-react';

export function Footer() {
    return (
        <footer className="mx-auto max-w-6xl px-6 pb-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <Logo />
                <Navigation />
            </div>
            <div className="my-8 h-px w-full bg-zinc-700" />
            <Copyright />
        </footer>
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
    const { scrollToElement } = useScroll();

    const links = [
        { href: '#hero', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How it Works' },
        {
            href: 'https://discord.gg/projecthub',
            label: 'Discord',
            external: true,
        },
        {
            href: 'https://github.com/projecthub',
            label: 'GitHub',
            external: true,
        },
    ];

    return (
        <nav className="flex flex-wrap gap-8 text-sm text-zinc-400">
            {links.map(({ href, label, external }) => (
                <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                        if (external) {
                            e.preventDefault();
                            window.open(href, '_blank');
                        } else {
                            e.preventDefault();
                            scrollToElement(href);
                        }
                    }}
                    className="transition-colors hover:text-zinc-100"
                    {...(external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    })}
                >
                    {label}
                </a>
            ))}
        </nav>
    );
}

function Copyright() {
    return (
        <div className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} Project Hub. All rights reserved.
        </div>
    );
}
