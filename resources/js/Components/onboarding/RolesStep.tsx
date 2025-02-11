import { FloatingSelections } from '@/components/onboarding/FloatingSelections';
import { roles } from '@/components/onboarding/roles';
import { OnboardingType } from '@/components/onboarding/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/hooks/useOnboarding';

interface RolesStepProps {
    data: OnboardingType;
    onChange: (
        field: keyof OnboardingType,
        value: string[] | Record<string, string>,
    ) => void;
}

export default function RolesStep({ data, onChange }: RolesStepProps) {
    const {
        search,
        setSearch,
        customName,
        setCustomName,
        showCustomForm,
        setShowCustomForm,
        toggleItem: toggleRole,
        addCustomItem: addCustomRole,
        clearAll: clearAllRoles,
        filteredItems: filteredRoles,
    } = useOnboarding({
        data,
        field: 'roles',
        onChange,
        items: roles,
    });

    return (
        <>
            <div className="space-y-6">
                <Input
                    type="search"
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="space-y-6">
                    {Object.entries(filteredRoles).map(
                        ([category, roleList]) => (
                            <div key={category}>
                                <h3 className="mb-3 text-lg font-semibold">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {roleList.map((role) => (
                                        <Badge
                                            key={role.name}
                                            variant={
                                                data.roles.includes(role.name)
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="cursor-pointer px-3 py-1 text-base"
                                            onClick={() =>
                                                toggleRole(role.name)
                                            }
                                        >
                                            {role.logo ? (
                                                <img
                                                    src={role.logo}
                                                    alt={role.name}
                                                    className={`mr-2 h-4 w-4 dark:invert`}
                                                />
                                            ) : (
                                                <span className="mr-2">
                                                    {role.icon}
                                                </span>
                                            )}
                                            {role.name}
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
                        Add Custom Role
                    </Button>
                ) : (
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Add Custom Role
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
                                placeholder="Role name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                            <Button
                                onClick={addCustomRole}
                                disabled={!customName}
                                variant="outline"
                                className="w-full"
                            >
                                Add Role
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FloatingSelections
                items={data.roles}
                onRemove={toggleRole}
                onClearAll={clearAllRoles}
                label="Selected Roles"
            />
        </>
    );
}
