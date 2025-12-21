"use client"

import { MultiSelect } from "@/features/shared/components/MultiSelect";
import { FormEvent, useEffect, useState } from "react";
import { useNavigationContext } from "../NavigationContext";
import { SingleSelect } from "@/features/shared/components/SingleSelect";

interface LogFormClientProps {
    appNames: string[];
    namespaces: string[];
}

const LEVELS = ["Information", "Warning", "Error", "Debug", "Verbose"];
const LIMITS = ['100', '200', '500', '1000'];

export default function LogFormClient({ appNames, namespaces }: LogFormClientProps) {
    const { isPending, navigate } = useNavigationContext();
    const today = new Date().toLocaleDateString('en-CA');

    const [limit, setLimit] = useState('100');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState(today);
    const [startTime, setStartTime] = useState('00:00');
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedNamespaces, setSelectedNamespaces] = useState<string[]>([]);
    const [excludedNamespaces, setExcludedNamespaces] = useState<string[]>([]);

    useEffect(() => {
        if (startDate && !startTime) setStartTime('00:00');
        if (startTime && !startDate) setStartDate(today);

        if (endDate && !endTime) setEndTime('23:59');
        if (endTime && !endDate) setEndDate(today);
    }, [startDate, startTime, endDate, endTime, today]);

    function handleReset() {
        setEndDate('');
        setEndTime('');
        setLimit('100');
        setStartDate(today);
        setStartTime('00:00');
        setSelectedApps([]);
        setSelectedLevels([]);
        setSelectedNamespaces([]);
        setExcludedNamespaces([]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const startDateTime = startDate && startTime ? `${startDate}T${startTime}` : '';
        const endDateTime = endDate && endTime ? `${endDate}T${endTime}` : '';

        if (startDateTime && endDateTime && endDateTime < startDateTime) {
            // TODO: show notification
            return;
        }

        const query = new URLSearchParams({ limit: limit });
        selectedApps.forEach(a => query.append('apps', a));
        selectedLevels.forEach(l => query.append('levels', l));
        selectedNamespaces.forEach(n => query.append('includedNamespaces', n));
        excludedNamespaces.forEach(n => query.append('excludedNamespaces', n));
        if (startDateTime) query.set('startDateTime', startDateTime);
        if (endDateTime) query.set('endDateTime', endDateTime);

        navigate(`/app-logger?${query.toString()}`);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 flex justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span className="uppercase tracking-wide">APP LOGGER</span>
            </div>

            <div className="mb-4 h-px w-full bg-gray-200 dark:bg-white/10" />

            <MultiSelect
                label='Apps'
                items={appNames}
                selectedItems={selectedApps}
                onSelection={setSelectedApps}
            />

            <MultiSelect
                label='Levels'
                items={LEVELS}
                selectedItems={selectedLevels}
                onSelection={setSelectedLevels}
            />

            <MultiSelect
                label='Included Namespaces'
                items={namespaces}
                selectedItems={selectedNamespaces}
                onSelection={setSelectedNamespaces}
            />

            <MultiSelect
                label='Excluded Namespaces'
                items={namespaces}
                selectedItems={excludedNamespaces}
                onSelection={setExcludedNamespaces}
            />

            <SingleSelect 
                label='Limit'
                items={LIMITS}
                selection={limit}
                onSelection={setLimit}
            />

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">

                <div className="relative">
                    <label htmlFor="startDate" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        Start Date
                    </label>

                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
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
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { } }}
                        className="cursor-pointer select-none peer block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="endDate" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        End Date
                    </label>

                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { } }}
                        className="cursor-pointer select-none peer block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="endTime" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        End Time
                    </label>

                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch { } }}
                        className="cursor-pointer select-none peer block w-full rounded-md bg-gray-50 px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>
            </div>

            <div className="mt-6 pt-4 flex gap-2 border-t border-gray-200 dark:border-white/10">
                <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                    {isPending ? "Searching…" : "Search"}
                </button>

                <button
                    type="button"
                    disabled={isPending}
                    onClick={handleReset}
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                    Reset
                </button>
            </div>
        </form>
    )
}