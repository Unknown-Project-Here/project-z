import { FloatingSelections } from '@/components/onboarding/FloatingSelections';
import { languages } from '@/components/onboarding/languages';
import { OnboardingType } from '@/components/onboarding/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface LanguagesStepProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function LanguagesStep({ data, onChange }: LanguagesStepProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleLanguage,
        addCustomItem: addCustomLanguage,
        clearAll: clearAllLanguages,
        filteredItems: filteredLanguages,
    } = useOnboarding({
        data,
        field: 'language',
        onChange,
        items: languages,
    });

    return (
        <>
            <div className="space-y-6">
                <Input
                    type="search"
                    placeholder="Search languages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-6">
                    {Object.entries(filteredLanguages).map(
                        ([category, langs]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-lg font-semibold">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {langs.map((lang) => (
                                        <Badge
                                            key={lang.name}
                                            variant={
                                                (data.language || []).includes(
                                                    lang.name,
                                                )
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="cursor-pointer px-3 py-1 text-base"
                                            onClick={() =>
                                                toggleLanguage(lang.name)
                                            }
                                        >
                                            {lang.logo ? (
                                                <img
                                                    src={lang.logo}
                                                    alt={lang.name}
                                                    className={`mr-2 h-4 w-4 dark:invert`}
                                                />
                                            ) : (
                                                <span className="mr-2">
                                                    {lang.icon}
                                                </span>
                                            )}
                                            {lang.name}
                                        </Badge>
                                    ))}
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
                        Add Custom Language
                    </Button>
                ) : (
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Add Custom Language
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
                                placeholder="Language name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                            <Button
                                onClick={addCustomLanguage}
                                disabled={!customName}
                                variant="outline"
                                className="w-full"
                            >
                                Add Language
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FloatingSelections
                items={data.language}
                onRemove={toggleLanguage}
                onClearAll={clearAllLanguages}
                label="Selected Languages"
            />
        </>
    );
}
