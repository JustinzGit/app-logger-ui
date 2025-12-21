'use client'

import { ILog, LogLevel } from "../../types";
import { formatLogTime, levelConfig } from "../../utils";
import { useEffect, useRef, useState } from "react";
import LogDialog from "../LogDialog";

export default function LogTable({ logs }: { logs: ILog[] }) {
    const [highlightedId, setHighlightedId] = useState<number | null>(null);
    const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);

    const prevCountRef = useRef<number>(logs.length);
    const clearHighlightTimeoutRef = useRef<number | null>(null);
    const rowRefs = useRef<Map<number, HTMLTableRowElement>>(new Map());

    // When new logs are appended, scroll to the first newly added row
    useEffect(() => {
        if (logs.length > prevCountRef.current) {
            const firstNewIndex = prevCountRef.current;
            const firstNewLog = logs[firstNewIndex];
            const row = firstNewLog ? rowRefs.current.get(firstNewLog.id) : undefined;
            if (row) row.scrollIntoView({ behavior: "smooth", block: "start" });
            if (firstNewLog) setHighlightedId(firstNewLog.id);
        }
        prevCountRef.current = logs.length;
    }, [logs]);

    // Clear highlight after a short delay with a smooth fade
    useEffect(() => {
        if (highlightedId === null) return;
        if (clearHighlightTimeoutRef.current) window.clearTimeout(clearHighlightTimeoutRef.current);
        clearHighlightTimeoutRef.current = window.setTimeout(() => setHighlightedId(null), 1500);
        return () => {
            if (clearHighlightTimeoutRef.current) window.clearTimeout(clearHighlightTimeoutRef.current);
        };
    }, [highlightedId]);

    const baseHeader = "h-10 bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";
    const baseRow = "px-1 py-1 text-[13px] whitespace-nowrap cursor";

    return (
        <>
            <table className="min-w-full table-fixed relative">
                <thead>
                    <tr>
                        <th scope="col" className={`${baseHeader} w-30 rounded-tl-md`}>App</th>
                        <th scope="col" className={`${baseHeader} w-22.5`}>Level</th>
                        <th scope="col" className={`${baseHeader} w-40`}>Namespace</th>
                        <th scope="col" className={`${baseHeader} w-44`}>Date Time</th>
                        <th scope="col" className={`${baseHeader} w-auto rounded-tr-md`}>Message</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {logs.map((log, index) => (
                        <tr
                            key={log.id}
                            onClick={() => setSelectedLogIndex(index)}
                            ref={rowElement => { if (rowElement) rowRefs.current.set(log.id, rowElement); }}
                            className={`${highlightedId === log.id ? 'bg-baylor-blue-300 text-white transition-colors duration-700' : ''} hover:bg-gray-300 hover:cursor-pointer scroll-mt-12`}>

                            <td className={`${baseRow} text-center w-30 pl-4 pr-3`}>{log.app}</td>
                            <td className={`${baseRow} text-center w-22.5`}>
                                <span className={`w-15 font-semibold inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs ${levelConfig[log.level as LogLevel]?.badgeColor}`}>
                                    {levelConfig[log.level as LogLevel]?.label ?? log.level}
                                </span>
                            </td>
                            <td className={`${baseRow} text-center w-40`}>{log.sourceContext?.split(".").pop() ?? "N/A"}</td>
                            <td className={`${baseRow} text-center w-44`}>{formatLogTime(log.logTime)}</td>
                            <td className={`${baseRow} min-w-37.5 max-w-75 overflow-hidden text-ellipsis whitespace-nowrap`}>{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <LogDialog
                logs={logs}
                selectedIndex={selectedLogIndex}
                onNavigate={setSelectedLogIndex}
                onClose={() => setSelectedLogIndex(null)}
            />
        </>
    )
}