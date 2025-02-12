import { FloatingSelections } from '@/components/onboarding/FloatingSelections';
import { frameworks } from '@/components/onboarding/frameworks';
import { OnboardingType } from '@/components/onboarding/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface FrameworksStepProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function FrameworksStep({
    data,
    onChange,
}: FrameworksStepProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleFramework,
        addCustomItem: addCustomFramework,
        clearAll: clearAllFrameworks,
        filteredItems: filteredFrameworks,
    } = useOnboarding({
        data,
        field: 'framework',
        onChange,
        items: frameworks,
    });

    return (
        <div className="space-y-6">
            <Input
                type="search"
                placeholder="Search frameworks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="space-y-6">
                {Object.entries(filteredFrameworks).map(([language, fws]) => (
                    <div key={language}>
                        <h3 className="mb-3 text-lg font-semibold">
                            {language}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {fws.map((fw) => (
                                <Badge
                                    key={fw.name}
                                    variant={
                                        data.framework.includes(fw.name)
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="cursor-pointer px-3 py-1 text-base"
                                    onClick={() => toggleFramework(fw.name)}
                                >
                                    {fw.logo ? (
                                        <img
                                            src={fw.logo}
                                            alt={fw.name}
                                            className="mr-2 h-4 w-4 dark:invert"
                                        />
                                    ) : (
                                        <span className="mr-2">{fw.icon}</span>
                                    )}
                                    {fw.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {!showCustomForm ? (
                <Button
                    onClick={() => setShowCustomForm(true)}
                    variant="outline"
                    className="w-full"
                >
                    Add Custom Framework
                </Button>
            ) : (
                <div className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Add Custom Framework
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
                            placeholder="Framework name"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                        />
                        <Button
                            onClick={addCustomFramework}
                            disabled={!customName}
                            variant="outline"
                            className="w-full"
                        >
                            Add Framework
                        </Button>
                    </div>
                </div>
            )}

            <FloatingSelections
                items={data.framework}
                onRemove={toggleFramework}
                onClearAll={clearAllFrameworks}
                label="Selected Frameworks"
            />
        </div>
    );
}
