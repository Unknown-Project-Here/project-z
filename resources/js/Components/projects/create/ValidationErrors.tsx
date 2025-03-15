import { Alert, AlertDescription } from '@/Components/ui/alert';

interface ValidationErrorsProps {
    errors: Record<string, string>;
}

export default function ValidationErrors({ errors }: ValidationErrorsProps) {
    if (Object.keys(errors).length === 0) {
        return null;
    }

    return (
        <Alert variant="destructive">
            <AlertDescription>
                Please fix the following errors:
                <ul className="list-disc pl-4">
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
}
