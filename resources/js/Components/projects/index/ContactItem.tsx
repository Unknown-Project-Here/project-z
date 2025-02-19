interface ContactItemProps {
    href: string;
    icon: JSX.Element;
    label: string;
}

export default function ContactItem({ href, icon, label }: ContactItemProps) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
            >
                {label}
            </a>
        </div>
    );
}
