export interface OnboardingType {
    techStack: string[];
    languages: string[];
    frameworks: string[];
    expertise: string;
    roles: string[];
}

export interface OnboardingItem {
    name: string;
    icon: string;
    logo?: string;
}
export type FilteredOnboardingItem = Record<string, OnboardingItem[]>;
