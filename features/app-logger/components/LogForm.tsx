'use client'

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MultiSelect } from '@/features/shared/components/MultiSelect';

interface ILogFromProps {
    apps: string[];
}

const LEVELS = ["Information", "Warning", "Error", "Debug", "Verbose"]

export default function LogForm({ apps }: ILogFromProps) {
    const router = useRouter();
    const today = new Date().toLocaleDateString('en-CA');

    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

    useEffect(() => {
        if (startDate && !startTime) setStartTime('00:00');
        if (startTime && !startDate) setStartDate(today);

        if (endDate && !endTime) setEndTime('23:59');
        if (endTime && !endDate) setEndDate(today);
    }, [startDate, startTime, endDate, endTime, today]);


    function handleReset() {
        setSelectedApps([]);
        setSelectedLevels([]);
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const startDateTime = startDate && startTime ? `${startDate}T${startTime}` : '';
        const endDateTime = endDate && endTime ? `${endDate}T${endTime}` : '';

        if (startDateTime && endDateTime && endDateTime < startDateTime) {
            // TODO: show notification
            return;
        }

        const query = new URLSearchParams({ pageNumber: '1', pageSize: '100' });
        selectedApps.forEach(a => query.append('apps', a));
        selectedLevels.forEach(l => query.append('levels', l));
        if (startDateTime) query.set('startDateTime', startDateTime);
        if (endDateTime) query.set('endDateTime', endDateTime);

        router.push(`/app-logger?${query.toString()}`);
    }

    return (
        <div className="w-[300px] flex flex-col items-center">
            <form onSubmit={handleSubmit} className='w-[80%]'>
                <MultiSelect
                    label='Apps'
                    items={apps}
                    onSelection={setSelectedApps}
                />

                <MultiSelect
                    label='Levels'
                    items={LEVELS}
                    onSelection={setSelectedLevels}
                />

                <div className="relative mt-2">
                    <label htmlFor="startDate" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        Start Date
                    </label>

                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch {} }}
                        className="cursor-pointer peer block w-full rounded-md bg-white px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative mt-2">
                    <label htmlFor='startTime' className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        Start Time
                    </label>

                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch {} }}
                        className="cursor-pointer peer block w-full rounded-md bg-white px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative mt-2">
                    <label htmlFor="endDate" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        End Date
                    </label>

                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch {} }}
                        className="cursor-pointer peer block w-full rounded-md bg-white px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="relative mt-2">
                    <label htmlFor="endTime" className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition peer-focus:text-baylor-blue-100 dark:text-gray-400">
                        End Time
                    </label>

                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        onClick={(e) => { try { e.currentTarget.showPicker?.(); } catch {} }}
                        className="cursor-pointer peer block w-full rounded-md bg-white px-3 pt-7 pb-1.5 text-sm text-gray-900 outline outline-gray-300 focus:outline-2 focus:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10"
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    <button type="submit" className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded">
                        Search
                    </button>
                    <button type="button" onClick={handleReset} className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded">
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}