import { FloatingSelections } from '@/components/onboarding/FloatingSelections';
import { techStacks } from '@/components/onboarding/techStacks';
import { OnboardingType } from '@/components/onboarding/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface TechStackStepProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function TechStackStep({ data, onChange }: TechStackStepProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleTechStack,
        addCustomItem: addCustomTechStack,
        filteredItems: filteredTechStacks,
    } = useOnboarding({
        data,
        field: 'techStack',
        onChange,
        items: techStacks,
    });

    const clearAllTechStack = () => {
        onChange('techStack', []);
    };

    return (
        <>
            <div className="space-y-6">
                <Input
                    type="search"
                    placeholder="Search tech stacks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-6">
                    {Object.entries(filteredTechStacks).map(
                        ([category, techs]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-lg font-semibold">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {techs.map((tech) => (
                                        <Badge
                                            key={tech.name}
                                            variant={
                                                data.techStack.includes(
                                                    tech.name,
                                                )
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="group cursor-pointer px-3 py-1 text-base"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTechStack(tech.name);
                                            }}
                                        >
                                            {tech.logo ? (
                                                <img
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    className="mr-2 h-4 w-4 dark:invert"
                                                />
                                            ) : (
                                                <span className="mr-2">
                                                    {tech.icon}
                                                </span>
                                            )}
                                            {tech.name}
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
                        Add Custom Tech Stack
                    </Button>
                ) : (
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Add Custom Tech Stack
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
                                placeholder="Tech stack name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                            <Button
                                onClick={addCustomTechStack}
                                disabled={!customName}
                                variant="outline"
                                className="w-full"
                            >
                                Add Tech Stack
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FloatingSelections
                items={data.techStack}
                onRemove={toggleTechStack}
                onClearAll={clearAllTechStack}
                label="Selected Tech Stacks"
            />
        </>
    );
}
