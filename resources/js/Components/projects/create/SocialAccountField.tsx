import { Icons } from '@/Components/icons';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { usePageProps } from '@/hooks/usePageProps';
import { router } from '@inertiajs/react';

type SocialPlatform = 'github' | 'discord' | 'google';

interface SocialAccountFieldProps {
    platform: SocialPlatform;
    icon: keyof typeof Icons;
    linkText: string;
}

type PagePropsWithUsernames = {
    usernames: {
        google?: string;
        github?: string;
        discord?: string;
    };
};

export default function SocialAccountField({
    platform,
    icon,
    linkText,
}: SocialAccountFieldProps) {
    const Icon = Icons[icon];
    const { props } = usePageProps<PagePropsWithUsernames>();
    const username = props.usernames?.[platform];

    const handleLinkAccount = () => {
        if (platform === 'github') {
            router.visit(route('social.link', platform));
        } else {
            window.location.href = route('social.login', platform);
        }
    };

    if (username) {
        return (
            <div className="relative">
                <Input
                    id={platform}
                    value={username}
                    className="cursor-not-allowed pl-[83px]"
                    readOnly
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                        <Icon className="h-5 w-5" />
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-[60px] items-center justify-center rounded-l-md border">
                <Icon className="h-5 w-5" />
            </div>
            <Button
                variant="outline"
                className="max-w-fit flex-1"
                onClick={handleLinkAccount}
            >
                {linkText}
            </Button>
        </div>
    );
}
