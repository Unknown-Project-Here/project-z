import ContactItem from '@/components/projects/index/ContactItem';
import { ProjectContact } from '@/types';
import { Mail } from 'lucide-react';

interface ContactLinksProps {
    contact?: ProjectContact;
}

const contactItems = [
    {
        key: 'github',
        label: 'GitHub',
        icon: <img src="/icons/github.svg" className="size-4 dark:invert" />,
    },
    {
        key: 'discord',
        label: 'Discord',
        icon: <img src="/icons/discord.svg" className="size-4 dark:invert" />,
    },
    {
        key: 'email',
        label: 'Email',
        icon: <Mail className="size-4" />,
        isEmail: true,
    },
];

export function ContactLinks({ contact }: ContactLinksProps) {
    if (!contact) return null;

    return (
        <div className="mt-4 space-y-2 text-sm">
            {contactItems.map(({ key, label, icon, isEmail }) => {
                const link = contact[key as keyof ProjectContact];
                if (!link) return null;

                return (
                    <ContactItem
                        key={key}
                        href={isEmail ? `mailto:${link}` : link}
                        icon={icon}
                        label={label}
                    />
                );
            })}
        </div>
    );
}
