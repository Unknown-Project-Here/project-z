import { ProjectContact, ProjectType } from '@/types';
import GoogleAccountField from './GoogleAccountField';
import SocialAccountField from './SocialAccountField';
import SocialLinkField from './SocialLinkField';

interface SocialLinksSectionProps {
    contact: ProjectContact;
    onChange: (field: keyof ProjectType, value: Record<string, string>) => void;
}

const socialAccounts = [
    {
        platform: 'github',
        icon: 'githubIcon',
        linkText: 'Link GitHub Account',
    },
    {
        platform: 'discord',
        icon: 'discord',
        linkText: 'Link Discord Account',
    },
];

const manualLinks = [
    {
        field: 'website',
        icon: 'globe',
        placeholder: 'Enter website URL',
    },
];

export default function SocialLinksSection({
    contact,
    onChange,
}: SocialLinksSectionProps) {
    const handleContactChange = (field: string, value: string) => {
        const newContact = {
            email: contact.email || '',
            discord: contact.discord || '',
            github: contact.github || '',
            website: contact.website || '',
            [field]: value,
        };

        onChange('contact', newContact);
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
                Project Social Links
            </label>

            {socialAccounts.map((account) => (
                <div className="relative" key={account.platform}>
                    <SocialAccountField
                        platform={account.platform as 'github' | 'discord'}
                        icon={
                            account.icon as keyof typeof import('@/Components/icons').Icons
                        }
                        linkText={account.linkText}
                    />
                </div>
            ))}

            <GoogleAccountField
                value={contact.email || ''}
                onChange={handleContactChange}
            />

            {manualLinks.map((link) => (
                <SocialLinkField
                    key={link.field}
                    field={link.field as keyof ProjectContact}
                    icon={
                        link.icon as keyof typeof import('@/Components/icons').Icons
                    }
                    placeholder={link.placeholder}
                    value={contact[link.field as keyof typeof contact] || ''}
                    onChange={handleContactChange}
                />
            ))}
        </div>
    );
}
