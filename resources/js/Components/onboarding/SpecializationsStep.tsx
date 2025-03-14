import { FloatingSelections } from '@/Components/onboarding/FloatingSelections';
import { specializations } from '@/Components/onboarding/specializations';
import { OnboardingType } from '@/Components/onboarding/types';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface SpecializationsStepProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function SpecializationsStep({
    data,
    onChange,
}: SpecializationsStepProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleSpecialization,
        addCustomItem: addCustomSpecialization,
        clearAll: clearAllSpecializations,
        filteredItems: filteredSpecializations,
    } = useOnboarding({
        data,
        field: 'specialization',
        onChange,
        items: specializations,
    });

    return (
        <>
            <div className="space-y-6">
                <Input
                    type="search"
                    placeholder="Search specializations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-6">
                    {Object.entries(filteredSpecializations).map(
                        ([category, specializationList]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-lg font-semibold">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {specializationList.map(
                                        (specialization) => (
                                            <Badge
                                                key={specialization.name}
                                                variant={
                                                    (
                                                        data.specialization ||
                                                        []
                                                    ).includes(
                                                        specialization.name,
                                                    )
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className="cursor-pointer px-3 py-1 text-base"
                                                onClick={() =>
                                                    toggleSpecialization(
                                                        specialization.name,
                                                    )
                                                }
                                            >
                                                {specialization.logo ? (
                                                    <img
                                                        src={
                                                            specialization.logo
                                                        }
                                                        alt={
                                                            specialization.name
                                                        }
                                                        className={`mr-2 h-4 w-4 dark:invert`}
                                                    />
                                                ) : (
                                                    <span className="mr-2">
                                                        {specialization.icon}
                                                    </span>
                                                )}
                                                {specialization.name}
                                            </Badge>
                                        ),
                                    )}
                                </div>
                            </div>
                        ),
                    )}
                </div>

                {!showCustomForm ? (
                    <Button
                        onClick={() => setShowCustomForm(true)}
                        variant="outline"
                        className="w-full"
                    >
                        Add Custom Specialization
                    </Button>
                ) : (
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Add Custom Specialization
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setShowCustomForm(false);
                                    setCustomName('');
                                }}
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Specialization name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                            <Button
                                onClick={addCustomSpecialization}
                                disabled={!customName}
                                variant="outline"
                                className="w-full"
                            >
                                Add Specialization
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FloatingSelections
                items={data.specialization}
                onRemove={toggleSpecialization}
                onClearAll={clearAllSpecializations}
                label="Selected Specializations"
            />
        </>
    );
}
