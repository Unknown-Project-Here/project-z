import { Badge } from '@/Components/ui/badge';
import { Label } from '@/Components/ui/label';
import { TextareaWithCounter } from '@/Components/ui/textarea-with-counter';
import { ChangeEvent } from 'react';

interface FormFieldProps {
    id: string;
    name?: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    placeholder?: string;
    className?: string;
    optional?: boolean;
    onChange?: (value: string) => void;
}

export function FormField({
    id,
    name,
    label,
    placeholder,
    className,
    optional = false,
    onChange,
}: FormFieldProps) {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <Label
                htmlFor={id}
                className="text-sm font-medium text-foreground/80"
            >
                {label}
            </Label>
            {optional && (
                <Badge variant="outline" className="ml-2">
                    Optional
                </Badge>
            )}
            <TextareaWithCounter
                id={id}
                name={name || id}
                placeholder={placeholder}
                className="min-h-[100px] placeholder:text-muted-foreground/50"
                required={!optional}
                maxLength={255}
                onChange={handleChange}
            />
        </div>
    );
}
