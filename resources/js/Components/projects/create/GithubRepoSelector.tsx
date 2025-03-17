import { Icons } from '@/Components/icons';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/ui/command';
import { Label } from '@/Components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { usePageProps } from '@/hooks/usePageProps';
import { cn } from '@/lib/utils';
import { ProjectCreateGithubRepoList, ProjectType } from '@/types';
import { router } from '@inertiajs/react';
import { Check, ChevronsUpDown, Lock, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GithubRepoSelectorProps {
    selectedRepo: { id: number; name: string } | null;
    onChange: (
        field: keyof ProjectType,
        value: { id: number; name: string } | null,
    ) => void;
}

type PagePropsWithRepos = {
    repos: ProjectCreateGithubRepoList | null;
    usernames: {
        github?: string;
    };
};

export default function GithubRepoSelector({
    selectedRepo,
    onChange,
}: GithubRepoSelectorProps) {
    const { props } = usePageProps<PagePropsWithRepos>();
    const repos = props.repos;
    const hasGithubAccount = !!props.usernames?.github;
    const [open, setOpen] = useState(false);
    const [linkRepo, setLinkRepo] = useState(!!selectedRepo);

    // Clear selected repo when linkRepo is set to false
    useEffect(() => {
        if (!linkRepo && selectedRepo) {
            onChange('githubRepo', null);
        }
    }, [linkRepo, selectedRepo, onChange]);

    const handleRepoSelect = (id: number, name: string) => {
        onChange('githubRepo', { id, name });
        setOpen(false);
    };

    const handleClearRepo = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('githubRepo', null);
    };

    const handleLinkGithub = () => {
        router.visit(route('social.link', 'github'));
    };

    const handleLinkRepoChange = (checked: boolean) => {
        setLinkRepo(checked);
        if (!checked) {
            onChange('githubRepo', null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="mb-2 flex items-center space-x-2">
                <Checkbox
                    id="link-repo"
                    checked={linkRepo}
                    onCheckedChange={handleLinkRepoChange}
                    disabled={!hasGithubAccount}
                />
                <Label
                    htmlFor="link-repo"
                    className="cursor-pointer text-sm font-medium leading-none"
                >
                    Link GitHub Repository to project?
                </Label>
            </div>

            {linkRepo && (
                <>
                    {!hasGithubAccount ? (
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-[60px] items-center justify-center rounded-l-md border">
                                <Icons.githubIcon className="h-5 w-5" />
                            </div>
                            <Button
                                variant="outline"
                                className="max-w-fit flex-1"
                                onClick={handleLinkGithub}
                            >
                                Link GitHub Account to Select Repository
                            </Button>
                        </div>
                    ) : !repos ||
                      (repos.public.length === 0 &&
                          repos.private.length === 0) ? (
                        <div className="rounded-md border border-dashed p-6 text-center">
                            <Icons.githubIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                                No repositories found in your GitHub account.
                            </p>
                        </div>
                    ) : (
                        <>
                            <Label className="text-sm font-medium leading-none">
                                Choose GitHub Repository to be linked to this
                                project
                            </Label>

                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between hover:bg-transparent"
                                    >
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            {selectedRepo && (
                                                <Icons.githubIcon className="h-4 w-4 flex-shrink-0" />
                                            )}
                                            <span className="truncate">
                                                {selectedRepo
                                                    ? selectedRepo.name
                                                    : 'Select a repository...'}
                                            </span>
                                            {selectedRepo &&
                                                repos &&
                                                [
                                                    ...repos.public,
                                                    ...repos.private,
                                                ].find(
                                                    (repo) =>
                                                        repo.id ===
                                                        selectedRepo.id,
                                                )?.id === selectedRepo.id &&
                                                repos.private.find(
                                                    (repo) =>
                                                        repo.id ===
                                                        selectedRepo.id,
                                                ) && (
                                                    <Lock className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                                                )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {selectedRepo && (
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-0 hover:bg-secondary"
                                                    onClick={handleClearRepo}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === 'Enter' ||
                                                            e.key === ' '
                                                        ) {
                                                            e.preventDefault();
                                                            handleClearRepo(
                                                                e as unknown as React.MouseEvent,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <XIcon className="h-3 w-3" />
                                                    <span className="sr-only">
                                                        Clear
                                                    </span>
                                                </div>
                                            )}
                                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                        </div>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full p-0"
                                    align="start"
                                >
                                    <Command>
                                        <CommandInput placeholder="Search repositories..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                No repositories found.
                                            </CommandEmpty>

                                            {repos.public.length > 0 && (
                                                <CommandGroup heading="Public Repositories">
                                                    {repos.public.map(
                                                        (repo) => (
                                                            <CommandItem
                                                                key={repo.id}
                                                                value={
                                                                    repo.name
                                                                }
                                                                onSelect={() =>
                                                                    handleRepoSelect(
                                                                        repo.id,
                                                                        repo.name,
                                                                    )
                                                                }
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        selectedRepo?.id ===
                                                                            repo.id
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                                {repo.name}
                                                            </CommandItem>
                                                        ),
                                                    )}
                                                </CommandGroup>
                                            )}

                                            {repos.private.length > 0 && (
                                                <CommandGroup heading="Private Repositories">
                                                    {repos.private.map(
                                                        (repo) => (
                                                            <CommandItem
                                                                key={repo.id}
                                                                value={
                                                                    repo.name
                                                                }
                                                                onSelect={() =>
                                                                    handleRepoSelect(
                                                                        repo.id,
                                                                        repo.name,
                                                                    )
                                                                }
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        selectedRepo?.id ===
                                                                            repo.id
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                                <span className="flex items-center gap-2">
                                                                    {repo.name}
                                                                    <Lock className="h-3 w-3 text-muted-foreground" />
                                                                </span>
                                                            </CommandItem>
                                                        ),
                                                    )}
                                                </CommandGroup>
                                            )}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
