import { domains } from '@/components/onboarding/domains';
import { FloatingSelections } from '@/components/onboarding/FloatingSelections';
import { OnboardingType } from '@/components/onboarding/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface DomainProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function DomainsStep({ data, onChange }: DomainProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleDomain,
        addCustomItem: addCustomDomain,
        filteredItems: filteredDomains,
    } = useOnboarding({
        data,
        field: 'domain',
        onChange,
        items: domains,
    });

    const clearAllDomain = () => {
        onChange('domain', []);
    };

    return (
        <>
            <div className="space-y-6">
                <Input
                    type="search"
                    placeholder="Search domains..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-6">
                    {Object.entries(filteredDomains).map(
                        ([category, domains]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-lg font-semibold">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {domains.map((domain) => (
                                        <Badge
                                            key={domain.name}
                                            variant={
                                                data.domain.includes(
                                                    domain.name,
                                                )
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="group cursor-pointer px-3 py-1 text-base"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDomain(domain.name);
                                            }}
                                        >
                                            {domain.logo ? (
                                                <img
                                                    src={domain.logo}
                                                    alt={domain.name}
                                                    className="mr-2 h-4 w-4 dark:invert"
                                                />
                                            ) : (
                                                <span className="mr-2">
                                                    {domain.icon}
                                                </span>
                                            )}
                                            {domain.name}
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
                        Add Custom Domain
                    </Button>
                ) : (
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Add Custom Domain
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
                                placeholder="Domain name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                            <Button
                                onClick={addCustomDomain}
                                disabled={!customName}
                                variant="outline"
                                className="w-full"
                            >
                                Add Domain
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FloatingSelections
                items={data.domain}
                onRemove={toggleDomain}
                onClearAll={clearAllDomain}
                label="Selected Domains"
            />
        </>
    );
}
