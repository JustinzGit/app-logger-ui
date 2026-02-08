"use client"

import { FormEvent, use, useEffect, useMemo, useState } from "react";
import { useNavigationContext } from "../NavigationContext";
import { usePathname, useSearchParams } from "next/navigation";
import { SingleSelect } from "@/features/shared/components/SingleSelect";
import { MultiSelect } from "@/features/shared/components/MultiSelect";
import { parseDateTime } from "../../utils";

interface ILogFormData {
    limit: string;
    apps: string[];
    levels: string[];
    startDate: string;
    startTime: string;
    includedNamespaces: string[];
    excludedNamespaces: string[];
    sort: 'Descending' | 'Ascending';
}

interface ILogFormProps {
    appNames: Promise<string[]>;
    namespaces: Promise<string[]>;
}

const LIMITS = ['50', '100', '150', '200', '250'];
const LEVELS = ["Information", "Warning", "Error", "Debug", "Verbose"];

const DEFAULT_FORM_VALUES: ILogFormData = {
    apps: [],
    levels: [],
    limit: '50',
    sort: 'Ascending',
    startDate: '',
    startTime: '00:00',
    includedNamespaces: [],
    excludedNamespaces: [],
};

export default function LogForm({ appNames: appNamePromise, namespaces: namespacePromise }: ILogFormProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isPending, navigate, refresh } = useNavigationContext();

    const appNames = use(appNamePromise);
    const namespaces = use(namespacePromise);

    const today = useMemo(() => new Date().toLocaleDateString('en-CA'), []);

    const getFormDataFromURL = (): ILogFormData => {
        const startDateTime = parseDateTime(searchParams.get('startDateTime'));
        return {
            ...DEFAULT_FORM_VALUES,
            sort: (searchParams.get('sortAscending') === 'false' ? 'Descending' : 'Ascending'),
            limit: searchParams.get('limit') || DEFAULT_FORM_VALUES.limit,
            startDate: startDateTime?.date || today,
            startTime: startDateTime?.time || '00:00',
            apps: searchParams.getAll('apps'),
            levels: searchParams.getAll('levels'),
            includedNamespaces: searchParams.getAll('includedNamespaces'),
            excludedNamespaces: searchParams.getAll('excludedNamespaces'),
        };
    };

    const [formData, setFormData] = useState<ILogFormData>(getFormDataFromURL());

    // sync state with URL changes (browser back button, etc)
    useEffect(() => {
        setFormData(getFormDataFromURL());
    }, [searchParams, today]);

    const updateField = <FormField extends keyof ILogFormData>(field: FormField, value: ILogFormData[FormField]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({ ...DEFAULT_FORM_VALUES, startDate: today });
    };

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const params = new URLSearchParams();
        const { startDate, startTime } = formData;

        if (startDate) {
            params.set('startDateTime', `${startDate}T${startTime || '00:00'}`);
            const day = startDate.split('-')[2];
            if (day) params.set('logDay', day);
        }

        params.set('limit', formData.limit);
        params.set('sortAscending', formData.sort === 'Ascending' ? 'true' : 'false');

        formData.apps.forEach(a => params.append('apps', a));
        formData.levels.forEach(l => params.append('levels', l));
        formData.includedNamespaces.forEach(n => params.append('includedNamespaces', n));
        formData.excludedNamespaces.forEach(n => params.append('excludedNamespaces', n));

        const newQueryString = params.toString();
        const currentQueryString = searchParams.toString();

        if (newQueryString === currentQueryString) {
            refresh();
        }
        else {
            navigate(`${pathname}?${newQueryString}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-2 flex justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span className="uppercase tracking-wide">APP LOGGER</span>
            </div>

            <div className="mb-4 h-px w-full bg-gray-200 dark:bg-white/10" />

            <MultiSelect
                searchable
                label='Apps'
                items={appNames}
                selectedItems={formData.apps}
                onSelection={(value) => updateField('apps', value)}
            />

            <MultiSelect
                label='Levels'
                items={LEVELS}
                selectedItems={formData.levels}
                onSelection={(value) => updateField('levels', value)}
            />

            <MultiSelect
                searchable
                label='Included Namespaces'
                items={namespaces}
                selectedItems={formData.includedNamespaces}
                onSelection={(value) => updateField('includedNamespaces', value)}
            />

            <MultiSelect
                searchable
                label='Excluded Namespaces'
                items={namespaces}
                selectedItems={formData.excludedNamespaces}
                onSelection={(value) => updateField('excludedNamespaces', value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SingleSelect
                    label='Limit'
                    items={LIMITS}
                    selection={formData.limit}
                    onSelection={(value) => updateField('limit', value)}
                />

                <SingleSelect
                    label='Sort'
                    items={['Ascending', 'Descending']}
                    selection={formData.sort}
                    onSelection={(value) => updateField('sort', value as 'Descending' | 'Ascending')}
                />
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">

                <div className="relative">
                    <label htmlFor="startDate" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        Start Date
                    </label>

                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onMouseDown={(e) => e.preventDefault()}
                        onChange={(event) => updateField('startDate', event.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { } }}
                        className="cursor-pointer select-none peer block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative">
                    <label htmlFor='startTime' className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        Start Time
                    </label>

                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onMouseDown={(e) => e.preventDefault()}
                        onChange={(event) => updateField('startTime', event.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { } }}
                        className="cursor-pointer select-none peer block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>
            </div>

            <div className="mt-3 pt-4 flex gap-2 border-t border-gray-200 dark:border-white/10">
                <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                    {isPending ? "Searching…" : "Search"}
                </button>

                <button
                    type="button"
                    disabled={isPending}
                    onClick={resetForm}
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                    Reset
                </button>
            </div>
        </form>
    )
}