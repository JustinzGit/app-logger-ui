'use client'

import LogTable from "./LogTable";
import { ILog, ILogResponse } from "../../types";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getLogs } from "../../actions";
import LogTableFooter from "./LogTableFooter";
import LogDialog from "../LogDialog";

export function Logging({ logResponse }: { logResponse: ILogResponse }) {
    const searchParams = useSearchParams();

    // Because of the "Key Reset" in page.tsx, this state is guranteed to be fresh whenever the filters change.
    const [logs, setLogs] = useState<ILog[]>(logResponse.logs);
    const [hasMore, setHasMore] = useState<boolean>(logResponse.hasMore);
    const [cursorId, setCursorId] = useState<number | null>(logResponse.cursorId);
    
    const [isFetching, setIsFetching] = useState(false);
    const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);

    async function loadMoreLogs() {
        if (isFetching || !cursorId || !hasMore) return;

        try {
            setIsFetching(true);
            
            const params = new URLSearchParams(searchParams);
            params.set('cursorId', cursorId.toString());
            const nextLogResponse = await getLogs(Object.fromEntries(params.entries()));

            setLogs(prevLogs => [...prevLogs, ...nextLogResponse.logs]);
            setHasMore(nextLogResponse.hasMore);
            setCursorId(nextLogResponse.cursorId);
        } 
        finally {
            setIsFetching(false);
        }
    };

    return (
        <>
            <div className="h-full flex flex-col min-h-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden scroll-bar">
                    <LogTable
                        logs={logs}
                        searchParams={searchParams}
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
            <LogDialog
                logs={logs}
                selectedIndex={selectedLogIndex}
                onNavigate={setSelectedLogIndex}
                onClose={() => setSelectedLogIndex(null)}
            />
        </>
    )
}