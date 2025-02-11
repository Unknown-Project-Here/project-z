import { type Option } from '@/components/ui/multiselect';
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

export const convertOnboardingOptionsToMultiselectOption = (
    groupedData: Record<string, OnboardingItem[]>,
): Option[] => {
    const formattedOptions: Option[] = [];

    Object.entries(groupedData).forEach(([_, items]) => {
        formattedOptions.push(
            ...items.map((item) => ({
                value: item.name,
                label: item.name,
                icon: item.icon,
                logo: item.logo,
            })),
        );
    });

    return formattedOptions;
};
