import { Button } from '@/Components/ui/button';
import { PlusCircle } from 'lucide-react';
import React from 'react';

interface SubmitButtonProps {
    submitButtonText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    submitButtonText = 'Create Issue',
}) => (
    <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
    >
        <PlusCircle className="mr-2 h-4 w-4" />
        {submitButtonText}
    </Button>
);

export default React.memo(SubmitButton);
