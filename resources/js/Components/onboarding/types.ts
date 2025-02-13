export interface OnboardingType {
    domain: string[];
    language: string[];
    framework: string[];
    expertise: string;
    specialization: string[];
}

export interface OnboardingItem {
    name: string;
    icon: string;
    logo?: string;
}
export type FilteredOnboardingItem = Record<string, OnboardingItem[]>;
