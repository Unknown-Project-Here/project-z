/* eslint-disable @typescript-eslint/no-explicit-any */
// Only made this component using AI because Chrome sucks to view json as a collapsible tree and I don't want to use an extension for it, or use Firefox due to their recent privacy changes... but if the json is heavy, I still prefer Firefox to view json.
import { ChevronRight } from 'lucide-react';
import type * as React from 'react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/Components/ui/collapsible';
import { cn } from '@/lib/utils';

interface JsonTreeViewerProps {
    data: any;
    expandAll?: boolean;
    level?: number;
    label?: string;
}

export function JsonTreeViewer({
    data,
    expandAll = false,
    level = 0,
    label,
}: JsonTreeViewerProps) {
    const isObject = data !== null && typeof data === 'object';
    const isArray = Array.isArray(data);
    const isEmpty = isObject && Object.keys(data).length === 0;

    // Format the value based on its type
    const formatValue = (value: any): React.ReactNode => {
        if (value === null)
            return (
                <span className="text-yellow-600 dark:text-yellow-400">
                    null
                </span>
            );
        if (value === undefined)
            return (
                <span className="text-gray-500 dark:text-gray-400">
                    undefined
                </span>
            );

        switch (typeof value) {
            case 'boolean':
                return (
                    <span className="text-purple-600 dark:text-purple-400">
                        {value.toString()}
                    </span>
                );
            case 'number':
                return (
                    <span className="text-blue-600 dark:text-blue-400">
                        {value}
                    </span>
                );
            case 'string':
                return (
                    <span className="text-green-600 dark:text-green-400">
                        "{value}"
                    </span>
                );
            default:
                return value;
        }
    };

    // For primitive values, just show the value
    if (!isObject) {
        return (
            <div className="flex items-start">
                {label && (
                    <span className="mr-2 text-muted-foreground">{label}:</span>
                )}
                {formatValue(data)}
            </div>
        );
    }

    // For empty objects or arrays
    if (isEmpty) {
        return (
            <div className="flex items-start">
                {label && (
                    <span className="mr-2 text-muted-foreground">{label}:</span>
                )}
                <span>{isArray ? '[]' : '{}'}</span>
            </div>
        );
    }

    // For objects and arrays
    return (
        <div className={cn('pl-0', level > 0 && 'pl-4')}>
            <Collapsible defaultOpen={expandAll} className="json-tree-node">
                <div className="flex items-start">
                    <CollapsibleTrigger
                        className="group flex items-center gap-1 hover:text-primary"
                        data-collapsible-trigger
                    >
                        <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                        {label && (
                            <span className="mr-2 text-muted-foreground">
                                {label}:
                            </span>
                        )}
                        <span>{isArray ? '[' : '{'}</span>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                    <div className="relative">
                        <div
                            className="absolute bottom-0 left-0 top-0 w-2 cursor-pointer border-l-2 border-border"
                            onClick={(e) => {
                                // Find the closest CollapsibleTrigger and click it
                                const parent =
                                    e.currentTarget.closest('.json-tree-node');
                                const trigger = parent?.querySelector(
                                    '[data-collapsible-trigger]',
                                );
                                if (trigger && trigger instanceof HTMLElement) {
                                    trigger.click();
                                }
                                e.stopPropagation();
                            }}
                        />
                        <div className="mt-1 pl-4">
                            {isArray
                                ? data.map((item: any, index: number) => (
                                      <JsonTreeViewer
                                          key={index}
                                          data={item}
                                          expandAll={expandAll}
                                          level={level + 1}
                                          label={index.toString()}
                                      />
                                  ))
                                : Object.entries(data).map(([key, value]) => (
                                      <JsonTreeViewer
                                          key={key}
                                          data={value}
                                          expandAll={expandAll}
                                          level={level + 1}
                                          label={key}
                                      />
                                  ))}
                        </div>
                    </div>
                    <div className="ml-4">{isArray ? ']' : '}'}</div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
