'use client'

import { Checkbox } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IMultiSelectProps {
    label: string;
    items: string[];
    searchable?: boolean;
    selectedItems: string[];
    onSelection: (selected: string[]) => void;
}

export function MultiSelect({ label, items, onSelection, selectedItems, searchable = false }: IMultiSelectProps) {
    const [selected, isSelected] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (!rootRef.current) return
            if (!rootRef.current.contains(e.target as Node)) { isSelected(false) }
        }
        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    }, []);

    function toggleItem(item: string) {
        const next = selectedItems.includes(item)
            ? selectedItems.filter(x => x !== item)
            : [...selectedItems, item];
        onSelection(next);
        setSearchQuery('');
    }

    const displayLabel = (() => {
        if (selectedItems.length === 0) return label;
        return selectedItems.join(', ');
    })();

    const filteredItems = searchable && searchQuery
        ? items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        : items;

    return (
        <div ref={rootRef} className="mt-2 relative w-full min-w-0">
            <div className="relative w-full min-w-0">
                {selectedItems.length > 0 && (
                    <label className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition dark:text-gray-400 z-10">
                        {label}
                    </label>
                )}
                <div
                    title={selectedItems.join(', ')}
                    onClick={() => isSelected(!selected)}
                    className={`${selected ? 'outline-2 outline-baylor-blue-100' : 'outline-1 outline-gray-300'} ${selectedItems.length > 0 ? 'pt-7 pb-1.5' : 'py-1.5'} h-[54px] w-full min-w-0 cursor-pointer appearance-none rounded-md bg-gray-50 pr-10 pl-3 text-base text-gray-900 -outline-offset-1 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6 flex items-center dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-baylor-blue-100"`}>
                    <span className="truncate whitespace-nowrap">{displayLabel}</span>
                </div>
                <ExpandMoreIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4 dark:text-gray-400" />
            </div>

            {selected && (
                <div
                    className="mt-2 scroll-bar fixed z-50 min-w-67 cursor-pointer rounded-md bg-gray-50 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 shadow-lg focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-white/10 max-h-56 overflow-y-auto">
                    {searchable && (
                        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 px-3 pt-1.5 pb-2">
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder="Search..."
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-outline focus:border-baylor-blue-100"
                            />
                        </div>
                    )}
                    <div className="px-3 pb-1.5 space-y-1">
                        {filteredItems.map((item, i) => {
                            const checked = selectedItems.includes(item);
                            return (
                                <label
                                    key={i}
                                    className="flex items-center cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 py-1">
                                    <Checkbox
                                        size="small"
                                        disableRipple
                                        checked={checked}
                                        onChange={() => toggleItem(item)}
                                        sx={{ color: '#989898', padding: '4px', '&.Mui-checked': { color: '#0c2340' } }}
                                    />
                                    <span title={item} className="ml-1 flex-1 whitespace-nowrap text-left">{item}</span>
                                </label>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}