import { Icons } from '@/Components/icons';
import { Button } from '@/Components/ui/button';

interface SocialLoginButtonsProps {
    className?: string;
}

export function SocialLoginButtons({ className }: SocialLoginButtonsProps) {
    const socialProviders = [
        {
            name: 'Google',
            icon: Icons.google,
            route: 'social.login',
            provider: 'google',
        },
        {
            name: 'GitHub',
            icon: Icons.github,
            route: 'social.login',
            provider: 'github',
        },
        {
            name: 'Discord',
            icon: Icons.discord,
            route: 'social.login',
            provider: 'discord',
        },
    ];

    const handleSocialLogin = (routeName: string, provider: string) => {
        const url = route(routeName, provider);
        const width = 600;
        const height = 700;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        // Open the popup window
        const popup = window.open(
            url,
            `${provider}Auth`,
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`,
        );

        // Keep focus on the popup
        if (popup) popup.focus();
    };

    return (
        <div className={className}>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {socialProviders.map((provider) => (
                    <Button
                        key={provider.name}
                        variant="outline"
                        onClick={() =>
                            handleSocialLogin(provider.route, provider.provider)
                        }
                        className="space-x-2"
                    >
                        <provider.icon className="h-5 w-5" />
                        <span>{provider.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
