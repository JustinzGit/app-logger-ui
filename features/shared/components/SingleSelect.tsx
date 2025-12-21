'use client'

import { ChangeEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SingleSelectProps {
    label: string;
    items: string[];
    selection: string;
    onSelection: (value: string) => void;
}

export function SingleSelect({ label, items, selection, onSelection }: SingleSelectProps) {

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        onSelection(event.target.value);
    }

    return (
        <div className="mt-2 relative w-full min-w-0">
            <label
                htmlFor={label}
                className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                {label}
            </label>

            <select
                id={label}
                name={label}
                value={selection}
                onChange={handleChange}
                className="peer cursor-pointer select-none appearance-none block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 pr-8 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10">
                {items.map(item => <option key={item} value={item}>{item}</option>)}
            </select>

            <ExpandMoreIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4 dark:text-gray-400" />
        </div>
    );
}
