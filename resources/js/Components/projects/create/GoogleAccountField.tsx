import { Icons } from '@/Components/icons';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { usePageProps } from '@/hooks/usePageProps';
import { useEffect, useState } from 'react';

type PagePropsWithUsernames = {
    usernames: {
        google?: string;
        github?: string;
        discord?: string;
    };
};

interface GoogleAccountFieldProps {
    value: string;
    onChange: (field: string, value: string) => void;
}

export default function GoogleAccountField({
    value,
    onChange,
}: GoogleAccountFieldProps) {
    const Icon = Icons.mail;
    const { props } = usePageProps<PagePropsWithUsernames>();
    const googleEmail = props.usernames?.google;

    const [useLinkedEmail, setUseLinkedEmail] = useState(!!googleEmail);

    useEffect(() => {
        if (googleEmail && useLinkedEmail) {
            onChange('email', googleEmail);
        }
    }, [googleEmail, useLinkedEmail, onChange]);

    const handleUseLinkedToggle = (checked: boolean) => {
        setUseLinkedEmail(checked);
        if (checked && googleEmail) {
            onChange('email', googleEmail);
        } else {
            onChange('email', '');
        }
    };

    if (!googleEmail) {
        return (
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-[60px] items-center justify-center rounded-l-md border">
                        <Icon className="h-5 w-5" />
                    </div>
                    <Button
                        variant="outline"
                        className="max-w-fit flex-1"
                        onClick={() =>
                            (window.location.href = route(
                                'social.login',
                                'google',
                            ))
                        }
                    >
                        Link Google Account
                    </Button>
                </div>

                <div className="relative">
                    <Input
                        id="email"
                        value={value}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="pl-[83px]"
                        placeholder="Enter email address"
                        aria-label="Email"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                            <Icon className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="use-linked-email"
                    checked={useLinkedEmail}
                    onCheckedChange={handleUseLinkedToggle}
                />
                <Label htmlFor="use-linked-email">
                    Use linked Google email
                </Label>
            </div>

            {useLinkedEmail ? (
                <div className="relative">
                    <Input
                        id="google-email"
                        value={googleEmail}
                        className="cursor-not-allowed pl-[83px]"
                        readOnly
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                            <Icon className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <Input
                        id="email"
                        value={value}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="pl-[83px]"
                        placeholder="Enter custom email address"
                        aria-label="Email"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                            <Icon className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
