'use client'
// TODO: must be client?

import { IPagedList } from "@/features/shared/types";
import { ILog, LogLevel } from "@/features/app-logger/types";
import { formatLogTime, levelConfig } from "@/features/app-logger/utils";
import { useState } from "react";
import LogDialog from "./LogDialog";

export default function LogTable({ logResponse }: { logResponse: IPagedList<ILog> }) {
    const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);
    const baseRow = "px-1 py-1 text-[13px] whitespace-nowrap cursor";
    const baseHeader = "h-10 bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";

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
                    {logResponse.items.map((log, index) => (
                        <tr
                            key={log.id}
                            onClick={() => setSelectedLogIndex(index)}
                            className="hover:bg-gray-300 hover:cursor-pointer">
                            <td className={`${baseRow} text-center w-30 pl-4 pr-3`}>{log.app}</td>
                            <td className={`${baseRow} text-center w-22.5`}>
                                <span className={`font-semibold flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs w-[80%] ${levelConfig[log.level as LogLevel]?.badgeColor}`}>
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