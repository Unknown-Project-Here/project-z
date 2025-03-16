import { Icons } from '@/Components/icons';
import { Input } from '@/Components/ui/input';
import { ProjectContact } from '@/types';

interface SocialLinkFieldProps {
    field: keyof ProjectContact;
    icon: keyof typeof Icons;
    placeholder: string;
    value: string;
    onChange: (field: string, value: string) => void;
}

export default function SocialLinkField({
    field,
    icon,
    placeholder,
    value,
    onChange,
}: SocialLinkFieldProps) {
    const Icon = Icons[icon];

    return (
        <div className="relative">
            <Input
                id={field}
                value={value}
                onChange={(e) => onChange(field, e.target.value)}
                className="pl-[83px]"
                placeholder={placeholder}
                aria-label={field}
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
                <span className="flex h-full w-[60px] items-center justify-center border-r border-input">
                    <Icon className="h-5 w-5" />
                </span>
            </div>
        </div>
    );
}
