import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

export function CompleteOnboardingAlert() {
    return (
        <Alert
            variant="default"
            className="mb-6 border-primary/20 bg-primary/10"
        >
            <div className="flex items-center text-2xl font-medium text-primary">
                <AlertCircle className="mr-2 h-6 w-6 text-white" />
                Complete Your Profile
            </div>
            <AlertDescription className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex w-full items-center justify-between">
                    <p className="flex-1 text-base text-muted-foreground">
                        Please take a moment to complete your onboarding process
                        to unlock all features.
                    </p>
                    <Button
                        asChild
                        variant="default"
                        className="w-full sm:w-auto"
                    >
                        <Link href="/profile/onboarding">
                            Complete Onboarding
                        </Link>
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
    );
}
