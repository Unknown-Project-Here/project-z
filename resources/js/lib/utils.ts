import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface OnboardingItem {
    name: string;
    icon?: string;
    logo?: string;
}

export interface GroupOption {
    [key: string]: {
        value: string;
        label: string;
        icon?: string;
        logo?: string;
    }[];
}
