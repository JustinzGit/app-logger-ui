import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ILog, ILogResponse } from "../types";
import { getLogs } from "../actions";

export function useLogPagination(logResponse: ILogResponse) {
    const searchParams = useSearchParams();

    const [logs, setLogs] = useState<ILog[]>(logResponse.logs);
    const [hasMore, setHasMore] = useState(logResponse.hasMore);
    const [cursorId, setCursorId] = useState(logResponse.cursorId);
    const [isFetching, setIsFetching] = useState(false);

    const loadMoreLogs = async () => {
        if (isFetching || !cursorId || !hasMore) return;

        try {
            setIsFetching(true);
            const params = new URLSearchParams(searchParams);
            params.set('cursorId', cursorId.toString());

            const nextResponse = await getLogs(Object.fromEntries(params.entries()));

            setLogs(prev => [...prev, ...nextResponse.logs]);
            setHasMore(nextResponse.hasMore);
            setCursorId(nextResponse.cursorId);
        } 
        catch (error) {
            throw new Error("Failed to load more logs");
        } 
        finally {
            setIsFetching(false);
        }
    };

    return {
        logs,
        hasMore,
        isFetching,
        loadMoreLogs
    };
}