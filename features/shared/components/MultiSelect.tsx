'use client'

import { Checkbox } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IMultiSelectProps {
    label: string;
    items: string[];
    onSelection: (selected: string[]) => void;
}

export function MultiSelect({ label, items, onSelection }: IMultiSelectProps) {
    const [selected, isSelected] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (!rootRef.current) return
            if (!rootRef.current.contains(e.target as Node)) { isSelected(false) }
        }
        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    }, []);

    useEffect(() => {
        onSelection(Array.from(selectedItems));
    }, [selectedItems, onSelection]);

    function toggleItem(item: string) {
        setSelectedItems(prev => {
            const next = new Set(prev)
            next.has(item) ? next.delete(item) : next.add(item);
            return next;
        })
    }

    const displayLabel = (() => {
        if (selectedItems.size === 0) return label
        const values = Array.from(selectedItems)
        if (values.length === 1) return values[0]
        return `${values[0]}, +${values.length - 1}`
    })();

    return (
        <div ref={rootRef} className="mt-2 relative w-full">

            <div className="relative w-full">
                <div
                    onClick={() => isSelected(!selected)}
                    title={Array.from(selectedItems).join(', ')}
                    className="h-[54px] cursor-pointer appearance-none rounded-md bg-gray-50 py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-baylor-blue-100 sm:text-sm/6 flex items-center dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-baylor-blue-100">
                    {displayLabel}
                </div>

                <ExpandMoreIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4 dark:text-gray-400"
                />
            </div>

            {selected && (
                <div className="scroll-bar absolute left-0 right-0 z-20 mt-1 cursor-pointer rounded-md bg-white py-1.5 pr-3 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 shadow-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-baylor-blue-100 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-white/10 max-h-56 overflow-y-auto space-y-1">
                    {items.map((item, i) => {
                        const checked = selectedItems.has(item);
                        return (
                            <label
                                key={i}
                                className="flex items-center cursor-pointer select-none">
                                <Checkbox
                                    size="small"
                                    disableRipple
                                    checked={checked}
                                    onChange={() => toggleItem(item)}
                                    sx={{ color: '#989898', '&.Mui-checked': { color: '#0c2340' } }}
                                />
                                <span>{item}</span>
                            </label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}