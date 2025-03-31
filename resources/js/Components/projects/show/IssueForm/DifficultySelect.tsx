import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import React from 'react';

interface DifficultySelectProps {
    value: string;
    onValueChange: (value: string) => void;
}

const DifficultySelect: React.FC<DifficultySelectProps> = ({
    value,
    onValueChange,
}) => (
    <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-sm font-medium">
            Difficulty
        </Label>
        <Select value={value} onValueChange={onValueChange} required>
            <SelectTrigger
                id="difficulty"
                className="border-input bg-background focus:ring-ring/20"
            >
                <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    value="breeze"
                    className="font-medium text-muted-foreground/80"
                >
                    Breeze
                </SelectItem>
                <SelectItem
                    value="slope"
                    className="font-medium text-muted-foreground"
                >
                    Slope
                </SelectItem>
                <SelectItem value="hill" className="font-medium text-secondary">
                    Hill
                </SelectItem>
                <SelectItem value="cliff" className="font-medium text-primary">
                    Cliff
                </SelectItem>
                <SelectItem
                    value="mountain"
                    className="font-medium text-destructive"
                >
                    Mountain
                </SelectItem>
                <SelectItem
                    value="chasm"
                    className="font-bold text-destructive"
                >
                    Chasm
                </SelectItem>
                <SelectItem
                    value="everest"
                    className="font-bold text-destructive"
                >
                    Everest
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
);

export default React.memo(DifficultySelect);
