import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import React from 'react';

interface IssueDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const IssueDescriptionInput: React.FC<IssueDescriptionInputProps> = ({
    value,
    onChange,
}) => (
    <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
            Description
        </Label>
        <Textarea
            id="description"
            placeholder="Describe the issue in detail"
            className="min-h-[120px] border-input bg-background focus:border-ring focus:ring-ring/20"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
);

export default React.memo(IssueDescriptionInput);
