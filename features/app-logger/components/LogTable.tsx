'use client'

import { IPagedList } from "@/features/shared/types";
import { ILog, LogLevel } from "@/features/app-logger/types";
import { formatLogTime, levelConfig } from "@/features/app-logger/utils";
import { useMemo, useState } from "react";
import LogDialog from "./LogDialog";
import StraightIcon from '@mui/icons-material/Straight';

export default function LogTable({ logResponse }: { logResponse: IPagedList<ILog> }) {
    const [isDescending, setIsDescending] = useState(true);
    const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);

    const baseRow = "px-1 py-1 text-[13px] whitespace-nowrap cursor";
    const baseHeader = "h-10 bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";

    const sortedItems = useMemo(() => {
        const items = [...logResponse.items];
        items.sort((a, b) => (isDescending ? b.id - a.id : a.id - b.id));
        return items;
    }, [logResponse.items, isDescending]);

    return (
        <>
            <table className="min-w-full table-fixed relative">
                <thead>
                    <tr>
                        <th scope="col" className={`${baseHeader} w-30 rounded-tl-md`}>App</th>
                        <th scope="col" className={`${baseHeader} w-22.5`}>Level</th>
                        <th scope="col" className={`${baseHeader} w-40`}>Namespace</th>
                        <th scope="col" className={`${baseHeader} w-44`}>
                            <div className="flex items-center justify-center gap-1">
                                <span>Date Time</span>
                                <button
                                    type="button"
                                    title={isDescending ? 'Descending' : 'Ascending'}
                                    onClick={() => setIsDescending((prev) => !prev)}
                                    className="cursor-pointer rounded hover:bg-white/10">
                                    <StraightIcon className={`transition-transform duration-200 ${isDescending ? 'rotate-180' : 'rotate-0'}`} />
                                </button>
                            </div>
                        </th>
                        <th scope="col" className={`${baseHeader} w-auto rounded-tr-md`}>Message</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                    {sortedItems.map((log, index) => (
                        <tr
                            key={log.id}
                            onClick={() => setSelectedLogIndex(index)}
                            className="hover:bg-gray-300 hover:cursor-pointer">
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
                logs={logResponse.items}
                selectedIndex={selectedLogIndex}
                onNavigate={setSelectedLogIndex}
                onClose={() => setSelectedLogIndex(null)}
            />
        </>
    )
}