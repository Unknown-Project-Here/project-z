import { OnboardingType } from '@/components/onboarding/types';
import { useState } from 'react';

interface UseOnboardingProps {
    data: OnboardingType;
    field: keyof OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: Record<string, string> | string[],
    ) => void;
    items: Record<string, { name: string; icon?: string; logo?: string }[]>;
}

export function useOnboarding({
    data,
    field,
    onChange,
    items,
}: UseOnboardingProps) {
    const [search, setSearch] = useState('');
    const [customName, setCustomName] = useState('');
    const [showCustomForm, setShowCustomForm] = useState(false);

    const currentValues = (data[field] as string[]) ?? [];

    const toggleItem = (item: string) => {
        const newItems = currentValues.includes(item)
            ? currentValues.filter((i) => i !== item)
            : [...currentValues, item];
        onChange(field, newItems);
    };

    const addCustomItem = () => {
        if (!customName) return;

        if (!currentValues.includes(customName)) {
            onChange(field, [...currentValues, customName]);
            setCustomName('');
            setShowCustomForm(false);
        }
    };

    const clearAll = () => {
        onChange(field, []);
    };

    const filteredItems = Object.entries(items).reduce(
        (acc, [category, categoryItems]) => {
            const filtered = categoryItems.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
            );
            if (filtered.length > 0) {
                acc[category] = filtered;
            }
            return acc;
        },
        {} as Record<string, (typeof items)[keyof typeof items][number][]>,
    );

    return {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem,
        addCustomItem,
        clearAll,
        filteredItems,
    };
}
