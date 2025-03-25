import { Button } from '@/Components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { PaginationMeta } from '@/types';
import { router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import React, { useCallback } from 'react';

interface PaginationProps {
    pagination: PaginationMeta;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
    perPageOptions?: number[];
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    pagination,
    onPageChange,
    onPerPageChange,
    perPageOptions = [10, 20, 30, 50],
    className = '',
}) => {
    const {
        current_page,
        from,
        to,
        total,
        last_page,
        per_page,
        prev_page_url,
        next_page_url,
        first_page_url,
        last_page_url,
        path,
    } = pagination;

    // Calculate sibling pages
    const getPageNumbers = () => {
        const delta = 2; // Number of sibling pages to show on each side
        const range = [];
        const rangeWithDots: (number | string)[] = [];

        let start = Math.max(1, current_page - delta);
        let end = Math.min(last_page, current_page + delta);

        if (end - start < 4) {
            if (start === 1) {
                end = Math.min(start + 4, last_page);
            } else if (end === last_page) {
                start = Math.max(end - 4, 1);
            }
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (start > 2) {
            rangeWithDots.push(1);
            if (start > 3) rangeWithDots.push('...');
        }

        rangeWithDots.push(...range);

        if (end < last_page - 1) {
            if (end < last_page - 2) rangeWithDots.push('...');
            rangeWithDots.push(last_page);
        }

        return rangeWithDots;
    };

    // Handle direct navigation to specific page
    const handlePageChange = useCallback(
        (page: number) => {
            // Call the parent's onPageChange if provided
            if (onPageChange) {
                onPageChange(page);
            }

            // Use the URL from links array if available
            const pageLink = pagination.links?.find(
                (link) => link.label === String(page),
            );

            if (pageLink?.url) {
                router.visit(pageLink.url, {
                    preserveState: true,
                    preserveScroll: true,
                });
            } else {
                // Fallback to constructing URL
                const url = new URL(path);
                url.searchParams.set('page', String(page));

                router.visit(url.toString(), {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        },
        [onPageChange, path, pagination.links],
    );

    // Navigate to URL provided in pagination data
    const navigateToUrl = useCallback(
        (url: string | null) => {
            if (!url) return;

            console.log('Navigating to URL:', url);

            router.visit(url, {
                preserveState: true,
                preserveScroll: true,
            });

            // Extract page from URL to call onPageChange callback if needed
            const pageMatch = url.match(/page=(\d+)/);
            if (pageMatch && onPageChange) {
                onPageChange(parseInt(pageMatch[1]));
            }
        },
        [onPageChange],
    );

    // Handle per page change
    const handlePerPageChange = useCallback(
        (perPage: number) => {
            // Call the parent's onPerPageChange if provided
            if (onPerPageChange) {
                onPerPageChange(perPage);
            }

            // Construct URL with new per_page parameter
            const url = new URL(path);
            url.searchParams.set('page', '1');
            url.searchParams.set('per_page', String(perPage));

            router.visit(url.toString(), {
                preserveState: true,
                preserveScroll: true,
            });
        },
        [onPerPageChange, path],
    );

    const pageNumbers = getPageNumbers();

    return (
        <div
            className={`flex flex-col items-center justify-between gap-4 sm:flex-row ${className}`}
        >
            {/* Results info */}
            <div className="text-sm text-muted-foreground">
                Showing {from} - {to} of {total} results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* First page button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToUrl(first_page_url)}
                    disabled={current_page === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToUrl(prev_page_url)}
                    disabled={!prev_page_url}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                {pageNumbers.map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span className="px-2">...</span>
                        ) : (
                            <Button
                                variant={
                                    current_page === page
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => handlePageChange(page as number)}
                            >
                                {page}
                            </Button>
                        )}
                    </React.Fragment>
                ))}

                {/* Next button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToUrl(next_page_url)}
                    disabled={!next_page_url}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last page button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateToUrl(last_page_url)}
                    disabled={current_page === last_page}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Items per page selector */}
            {onPerPageChange && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Items per page:
                    </span>
                    <Select
                        value={per_page.toString()}
                        onValueChange={(value) =>
                            handlePerPageChange(parseInt(value))
                        }
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {perPageOptions.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option.toString()}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
};

export default Pagination;
