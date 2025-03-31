import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface InputWithCounterProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    maxLength?: number;
    showCounter?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    counterClassName?: string;
}

const InputWithCounter = React.forwardRef<
    HTMLInputElement,
    InputWithCounterProps
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

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCount(e.target.value.length);
            onChange?.(e);
        };

        const isControlled = value !== undefined;

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    className={cn('pr-12', className)}
                    maxLength={maxLength}
                    value={isControlled ? value : undefined}
                    defaultValue={!isControlled ? defaultValue : undefined}
                    onChange={handleChange}
                    {...props}
                />
                {showCounter && (
                    <div
                        className={cn(
                            'absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground',
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

InputWithCounter.displayName = 'InputWithCounter';

export { InputWithCounter };
