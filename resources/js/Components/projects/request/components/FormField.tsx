import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface FormFieldProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    placeholder?: string;
    className?: string;
}

export function FormField({
    id,
    label,
    type = 'text',
    placeholder,
    className,
}: FormFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label
                htmlFor={id}
                className="text-sm font-medium text-foreground/80"
            >
                {label}
            </Label>
            {type === 'textarea' ? (
                <Textarea
                    id={id}
                    placeholder={placeholder}
                    className="min-h-[100px] placeholder:text-muted-foreground/50"
                />
            ) : (
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="placeholder:text-muted-foreground/50"
                />
            )}
        </div>
    );
}
