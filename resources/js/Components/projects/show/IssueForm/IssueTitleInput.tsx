import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import React from 'react';

interface IssueTitleInputProps {
    value: string;
    onChange: (value: string) => void;
}

const IssueTitleInput: React.FC<IssueTitleInputProps> = ({
    value,
    onChange,
}) => (
    <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
            Issue Title
        </Label>
        <Input
            id="title"
            placeholder="Enter issue title"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="border-input bg-background focus:border-ring focus:ring-ring/20"
        />
    </div>
);

export default React.memo(IssueTitleInput);
