import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ILog, ILogResponse } from "../types";
import { getLogs } from "../actions";

const MAX_LOGS = 500;

export function useLogPagination(logResponse: ILogResponse) {
    const searchParams = useSearchParams();

    const [isFetching, setIsFetching] = useState(false);
    const [logs, setLogs] = useState<ILog[]>(logResponse.logs);
    const [hasMore, setHasMore] = useState(logResponse.hasMore);
    const [cursorId, setCursorId] = useState(logResponse.cursorId);

    const loadMoreLogs = async () => {
        if (isFetching) return;

        try {
            setIsFetching(true);
            const params = new URLSearchParams(searchParams);
            
            if (cursorId) {
                params.set('cursorId', cursorId.toString());
            }

            const nextResponse = await getLogs(Object.fromEntries(params.entries()));

            setLogs(prev => {
                if (prev.length >= MAX_LOGS) {
                    return nextResponse.logs
                }
                else {
                    return [...prev, ...nextResponse.logs]
                }
            });
            setHasMore(nextResponse.hasMore);
            setCursorId(nextResponse.cursorId ?? cursorId);
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