import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import React from 'react';

interface PrioritySelectProps {
    value: string;
    onValueChange: (value: string) => void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({
    value,
    onValueChange,
}) => (
    <div className="space-y-2">
        <Label htmlFor="priority" className="text-sm font-medium">
            Priority
        </Label>
        <Select value={value} onValueChange={onValueChange} required>
            <SelectTrigger
                id="priority"
                className="border-input bg-background focus:ring-ring/20"
            >
                <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    value="p0"
                    className="font-semibold text-destructive"
                >
                    P0 (Critical)
                </SelectItem>
                <SelectItem value="p1" className="font-semibold text-primary">
                    P1 (High)
                </SelectItem>
                <SelectItem value="p2" className="font-semibold text-secondary">
                    P2 (Medium)
                </SelectItem>
                <SelectItem
                    value="p3"
                    className="font-semibold text-muted-foreground"
                >
                    P3 (Low)
                </SelectItem>
                <SelectItem
                    value="p4"
                    className="font-semibold text-muted-foreground/80"
                >
                    P4 (Trivial)
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
);

export default React.memo(PrioritySelect);
