import { Textarea } from '@/Components/ui/textarea';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface TextareaWithCounterProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxLength?: number;
    showCounter?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    counterClassName?: string;
}

const TextareaWithCounter = React.forwardRef<
    HTMLTextAreaElement,
    TextareaWithCounterProps
>(
    (
        {
            className,
            maxLength,
            showCounter = true,
            value,
            defaultValue,
            onChange,
            counterClassName,
            ...props
        },
        ref,
    ) => {
        const [count, setCount] = React.useState(() => {
            if (value !== undefined) return String(value).length;
            if (defaultValue !== undefined) return String(defaultValue).length;
            return 0;
        });

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCount(e.target.value.length);
            onChange?.(e);
        };

        const isControlled = value !== undefined;

        return (
            <div className="relative">
                <Textarea
                    ref={ref}
                    className={cn('pb-8 pr-12', className)}
                    maxLength={maxLength}
                    value={isControlled ? value : undefined}
                    defaultValue={!isControlled ? defaultValue : undefined}
                    onChange={handleChange}
                    {...props}
                />
                {showCounter && (
                    <div
                        className={cn(
                            'absolute bottom-2 right-3 text-xs text-muted-foreground',
                            maxLength &&
                                count > maxLength * 0.9 &&
                                'text-amber-500',
                            maxLength &&
                                count >= maxLength &&
                                'text-destructive',
                            counterClassName,
                        )}
                        aria-live="polite"
                    >
                        {count}
                        {maxLength ? ` / ${maxLength}` : ''}
                    </div>
                )}
            </div>
        );
    },
);

TextareaWithCounter.displayName = 'TextareaWithCounter';

export { TextareaWithCounter };
