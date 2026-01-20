'use client'

import { ILog, LogLevel } from "../../types";
import { formatLogTime, levelConfig } from "../../utils";
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from "react";

export default function LogTable({ logs, onRowClick }: { logs: ILog[], onRowClick: Dispatch<SetStateAction<number | null>> }) {
    const prevCountRef = useRef<number>(logs.length);

    useLayoutEffect(() => {
        if (logs.length > prevCountRef.current && prevCountRef.current > 0) {
            const firstNewIndex = prevCountRef.current;
            const firstNewLog = logs[firstNewIndex];

            if (firstNewLog) {
                const row = document.getElementById(`log-row-${firstNewLog.id}`);
                if (row) {
                    row.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }
        prevCountRef.current = logs.length;
    }, [logs]);

    const baseHeader = "h-10 bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";
    const baseRow = "px-1 py-1 text-[13px] whitespace-nowrap cursor";

    return (
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
                {logs.map((log, index) => {
                    const isNewestLog = index == prevCountRef.current;
                    return (
                        <tr
                            key={log.id}
                            id={`log-row-${log.id}`}
                            onClick={() => onRowClick(index)}
                            className={`hover:bg-gray-300 hover:cursor-pointer scroll-mt-12 ${isNewestLog ? 'animate-flash' : ''}`}>

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
                    )
                })}
            </tbody>
        </table>
    )
}