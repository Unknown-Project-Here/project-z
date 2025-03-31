import { Separator } from './separator';

export const Spacer = ({ size = '4', className = '' }) => {
    return <Separator className={`my-${size} bg-transparent ${className}`} />;
};
