import { Badge } from '@/Components/ui/badge';
import { InputWithCounter } from '@/Components/ui/input-with-counter';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useProjectProps } from '@/hooks/useProjectProps';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export function SearchMembersList() {
    const id = useProjectProps('id');
    const initialSearch = useMemo(() => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('search') || '';
    }, []);
    const [search, setSearch] = useState(initialSearch);
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const inputRef = useRef<HTMLInputElement>(null);

    const backToMembersList = () => {
        router.get(
            route('projects.show', {
                project: id,
                activeTab: 'members',
            }),
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (debouncedSearch.length >= 2 && debouncedSearch !== initialSearch) {
            router.get(
                route('projects.show', {
                    project: id,
                    activeTab: 'members',
                    search: debouncedSearch,
                }),
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [debouncedSearch, id, initialSearch]);

    return (
        <div className="flex flex-col gap-2">
            <InputWithCounter
                ref={inputRef}
                maxLength={16}
                placeholder="Search for a member (min 2 characters)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
            />
            {initialSearch && (
                <div className="flex items-center gap-2">
                    {' '}
                    <p>Search result for </p>
                    <Badge
                        variant="outline"
                        onClick={backToMembersList}
                        className="max-w-fit cursor-pointer text-lg hover:bg-destructive"
                    >
                        <X className="mr-2 size-4" />
                        {`"${initialSearch}"`}
                    </Badge>
                </div>
            )}
        </div>
    );
}
