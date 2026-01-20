'use client'

import LogTable from "./LogTable";
import { ILogResponse } from "../../types";
import { useState } from "react";
import LogTableFooter from "./LogTableFooter";
import LogDialog from "../LogDialog";
import { useLogPagination } from "../../hooks/useLogPagination";

export function Logging({ logResponse }: { logResponse: ILogResponse }) {
    const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);
    const { logs, hasMore, isFetching, loadMoreLogs } = useLogPagination(logResponse);
    return (
        <>
            <div className="h-full flex flex-col min-h-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden scroll-bar">
                    <LogTable
                        logs={logs}
                        onRowClick={setSelectedLogIndex}
                    />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <LogTableFooter
                        hasMoreLogs={hasMore}
                        isFetching={isFetching}
                        totalResults={logs.length}
                        loadMoreLogs={loadMoreLogs}
                    />
                </div>
            </div>
            {selectedLogIndex !== null && (
                <LogDialog
                    logs={logs}
                    selectedIndex={selectedLogIndex}
                    onNavigate={setSelectedLogIndex}
                    onClose={() => setSelectedLogIndex(null)}
                />
            )}
        </>
    )
}