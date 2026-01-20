'use client'

import { Checkbox } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IMultiSelectProps {
    label: string;
    items: string[];
    selectedItems: string[];
    onSelection: (selected: string[]) => void;
}

export function MultiSelect({ label, items, onSelection, selectedItems }: IMultiSelectProps) {
    const [selected, isSelected] = useState(false);
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
    }

    const displayLabel = (() => {
        if (selectedItems.length === 0) return label;
        return selectedItems.join(', ');
    })();

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
                    className="scroll-bar fixed z-50 min-w-65 cursor-pointer rounded-md bg-gray-50 py-1.5 pr-3 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 shadow-lg focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-white/10 max-h-56 overflow-y-auto space-y-1">
                    {items.map((item, i) => {
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
            )}
        </div>
    )
}