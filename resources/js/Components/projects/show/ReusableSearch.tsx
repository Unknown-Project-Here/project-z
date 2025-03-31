import { Badge } from '@/Components/ui/badge';
import { InputWithCounter } from '@/Components/ui/input-with-counter';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type ReusableSearchProps = {
    routeName: string;
    routeParams?: Record<string, string | number>;
    minSearchLength?: number;
    maxLength?: number;
    placeholder?: string;
    debounceTime?: number;
};

export function ReusableSearch({
    routeName,
    routeParams = {},
    minSearchLength = 2,
    maxLength = 16,
    placeholder = 'Search...',
    debounceTime = 500,
}: ReusableSearchProps) {
    const initialSearch = useMemo(() => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('search') || '';
    }, []);
    const [search, setSearch] = useState(initialSearch);
    const [debouncedSearch] = useDebouncedValue(search, debounceTime);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (
            debouncedSearch.length >= minSearchLength &&
            debouncedSearch !== initialSearch
        ) {
            router.get(
                route(routeName, {
                    ...routeParams,
                    search: debouncedSearch,
                }),
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }
    }, [
        debouncedSearch,
        routeName,
        routeParams,
        initialSearch,
        minSearchLength,
    ]);

    return (
        <div className="flex flex-col gap-2">
            <InputWithCounter
                ref={inputRef}
                maxLength={maxLength}
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
            />
            {initialSearch && (
                <div className="flex items-center gap-2">
                    <p>Search result for </p>
                    <Badge
                        variant="outline"
                        onClick={() => window.history.back()}
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
