import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type HeadingProps = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children: ReactNode;
};

const Heading: React.FC<HeadingProps> = ({
    level = 1,
    className,
    children,
}) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const baseStyles =
        'font-bold tracking-tight text-gray-900 dark:text-gray-100';
    const sizeStyles: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
        1: 'text-4xl sm:text-5xl',
        2: 'text-3xl sm:text-4xl',
        3: 'text-2xl sm:text-3xl',
        4: 'text-xl sm:text-2xl',
        5: 'text-lg sm:text-xl',
        6: 'text-base sm:text-lg',
    };

    return (
        <Tag className={cn(baseStyles, sizeStyles[level], className)}>
            {children}
        </Tag>
    );
};

export default Heading;
