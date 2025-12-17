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
        <div ref={rootRef} className="mt-2 grid grid-cols-1 h-[54px]">

            <div
                onClick={() => isSelected(!selected)}
                title={Array.from(selectedItems).join(', ')}
                className="cursor-pointer col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-baylor-blue-100 sm:text-sm/6 flex items-center dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-baylor-blue-100">
                {displayLabel}
            </div>

            <ExpandMoreIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
            />

            {selected && (
                <div className="z-10 mt-1 cursor-pointer rounded-md bg-white py-1.5 pr-3 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-baylor-blue-100 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-baylor-blue-100">
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