import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FormSectionProps {
    title: string;
    icon?: typeof LucideIcon;
    children: ReactNode;
    description?: string;
}

export function FormSection({
    title,
    icon: Icon,
    children,
    description,
}: FormSectionProps) {
    return (
        <Card className="bg-card/0 text-foreground backdrop-blur-sm">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    {title}
                </CardTitle>
            </CardHeader>
            {description && (
                <CardDescription className="mb-4 px-6 text-sm text-muted-foreground">
                    {description}
                </CardDescription>
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
}
