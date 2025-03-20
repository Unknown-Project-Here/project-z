import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface FormSectionProps {
    title: string;
    icon?: typeof LucideIcon;
    children: ReactNode;
}

export function FormSection({ title, icon: Icon, children }: FormSectionProps) {
    return (
        <Card className="bg-card/0 text-foreground backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
