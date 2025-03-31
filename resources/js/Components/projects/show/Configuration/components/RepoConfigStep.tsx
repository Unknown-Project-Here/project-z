import { Button } from '@/Components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet';
import { useSocialAuthPopup } from '@/hooks/useSocialAuthPopup';
import { useUser } from '@/hooks/useUser';
import { ConfigStep, ConfigurationStep } from './ConfigurationStep';
import RepositoryList from './RepositoryList';

interface RepoConfigStepProps {
    step: ConfigStep;
}

export function RepoConfigStep({ step }: RepoConfigStepProps) {
    const user = useUser();
    const { openAuthPopup } = useSocialAuthPopup();

    const hasGithub = user?.social_usernames.github;

    return (
        <ConfigurationStep step={step}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>Connect Repository</Button>
                </SheetTrigger>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Connect Repository</SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                        {hasGithub ? (
                            <>
                                Connect a repository to enable Github
                                integration for your project.
                            </>
                        ) : (
                            <>
                                First, connect your Github account to enable
                                repository integration for your project.
                            </>
                        )}
                    </SheetDescription>

                    {hasGithub ? (
                        <RepositoryList />
                    ) : (
                        <Button onClick={() => openAuthPopup('github')}>
                            Connect Github
                        </Button>
                    )}
                </SheetContent>
            </Sheet>
        </ConfigurationStep>
    );
}
