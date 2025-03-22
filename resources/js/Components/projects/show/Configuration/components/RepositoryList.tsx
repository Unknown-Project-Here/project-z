import { Button } from '@/Components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { SheetClose } from '@/Components/ui/sheet';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetRepositories } from './hooks/useGetRepositories';

function RepositoryList() {
    const { repositories, isLoading, isError } = useGetRepositories();
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const project = useProjectProps();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-2">
                    <Select disabled>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Loading repositories..." />
                        </SelectTrigger>
                    </Select>
                    <Button disabled className="w-full">
                        Connect Repository
                    </Button>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col space-y-4 p-4">
                <p className="text-destructive">Error loading repositories</p>
                <SheetClose asChild>
                    <Button variant="secondary">Close</Button>
                </SheetClose>
            </div>
        );
    }

    const handleConnect = () => {
        if (!selectedRepo || !repositories) return;

        setIsSubmitting(true);

        const repo = [
            ...repositories.public,
            ...repositories.private,
            ...repositories.orgs,
        ].find((repo) => repo.id.toString() === selectedRepo);

        if (!repo) return;

        const [owner, name] = repo.name.split('/');

        axios
            .post(route('projects.configure.repository', project.id), {
                repo: {
                    id: repo.id,
                    name,
                    owner,
                },
            })
            .then(() => {
                setIsSubmitting(false);
                toast.success('Repository connected successfully');
            })
            .catch(() => {
                setIsSubmitting(false);
                toast.error('Failed to connect repository');
            })
            .finally(() => {
                router.reload();
            });
    };

    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="space-y-2">
                <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a repository" />
                    </SelectTrigger>
                    <SelectContent>
                        {repositories && repositories.public.length > 0 && (
                            <SelectGroup>
                                <SelectLabel>Public Repositories</SelectLabel>
                                {repositories.public.map((repo) => (
                                    <SelectItem
                                        key={repo.id}
                                        value={repo.id.toString()}
                                        className="cursor-pointer hover:bg-accent"
                                    >
                                        {repo.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        )}

                        {repositories && repositories.private.length > 0 && (
                            <SelectGroup>
                                <SelectLabel>Private Repositories</SelectLabel>
                                {repositories.private.map((repo) => (
                                    <SelectItem
                                        key={repo.id}
                                        value={repo.id.toString()}
                                        className="cursor-pointer hover:bg-accent"
                                    >
                                        {repo.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        )}

                        {repositories && repositories.orgs.length > 0 && (
                            <SelectGroup>
                                <SelectLabel>
                                    Organization Repositories
                                </SelectLabel>
                                {repositories.orgs.map((repo) => (
                                    <SelectItem
                                        key={repo.id}
                                        value={repo.id.toString()}
                                        className="cursor-pointer hover:bg-accent"
                                    >
                                        {repo.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        )}
                    </SelectContent>
                </Select>
            </div>

            <Button
                onClick={handleConnect}
                disabled={!selectedRepo || isSubmitting}
                className="w-full"
            >
                {isSubmitting ? 'Connecting...' : 'Connect Repository'}
            </Button>
        </div>
    );
}

export default RepositoryList;
