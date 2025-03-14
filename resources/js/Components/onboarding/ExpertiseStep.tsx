import { expertiseLevels } from '@/Components/onboarding/expertiseLevels';
import { OnboardingType } from '@/Components/onboarding/types';
import { Card } from '@/Components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';

interface ExpertiseStepProps {
    data: OnboardingType;
    onChange: (field: keyof OnboardingType, value: string) => void;
}

export default function ExpertiseStep({ data, onChange }: ExpertiseStepProps) {
    function setExpertise(expertise: string) {
        onChange('expertise', expertise);
    }

    return (
        <div className="space-y-4">
            <RadioGroup
                value={data.expertise}
                onValueChange={setExpertise}
                className="grid grid-cols-1 gap-4"
            >
                {expertiseLevels.map((level) => (
                    <div key={level.id}>
                        <Card
                            className="flex cursor-pointer space-x-3 p-4 hover:bg-muted/20 [&:has([data-state=checked])]:border-2 [&:has([data-state=checked])]:border-accent"
                            onClick={() => setExpertise(level.id)}
                        >
                            <RadioGroupItem
                                value={level.id}
                                id={level.id}
                                className="mt-1 data-[state=checked]:border-accent data-[state=checked]:text-accent"
                            />
                            <div className="space-y-1">
                                <span className="text-base font-medium leading-none">
                                    {level.label}
                                </span>
                                <p className="text-sm">{level.description}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
