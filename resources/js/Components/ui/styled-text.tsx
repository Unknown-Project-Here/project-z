/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from '@/lib/utils';
import * as React from 'react';

interface StyledTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text: string;
    highlights?: { phrase: string; className?: string }[];
}

const StyledText = React.memo(
    React.forwardRef<HTMLParagraphElement, StyledTextProps>(
        ({ className, text, highlights = [], ...props }, ref) => {
            const content = React.useMemo(() => {
                if (!highlights.length) return [text];

                const phrases = highlights.map((h) => h.phrase);
                const regex = new RegExp(
                    `(${phrases.map(escapeRegExp).join('|')})`,
                    'g',
                );
                const parts = text.split(regex).filter(Boolean);
                let highlightIndex = 0;

                return parts.map((part, i) => {
                    const highlight = highlights.find((h) => h.phrase === part);
                    if (highlight) {
                        highlightIndex++;
                        return (
                            <span
                                key={`${part}-${highlightIndex}`}
                                className={cn(highlight.className)}
                            >
                                {part}
                            </span>
                        );
                    }
                    return part;
                });
            }, [text, highlights]);

            return (
                <p className={cn(className)} ref={ref} {...props}>
                    {content}
                </p>
            );
        },
    ),
);

StyledText.displayName = 'StyledText';

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export { StyledText };
