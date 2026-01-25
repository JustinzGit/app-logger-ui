import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ILog, ILogResponse } from "../types";

const MAX_LOGS = 500;

export function useLogPagination(logResponse: ILogResponse) {
    const searchParams = useSearchParams();

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<ILog[]>(logResponse.logs);
    const [hasMore, setHasMore] = useState(logResponse.hasMore);
    const [cursorId, setCursorId] = useState(logResponse.cursorId);

    const loadMoreLogs = async () => {
        debugger
        if (isFetching || !cursorId) return;

        try {
            debugger
            setIsFetching(true);
            const params = new URLSearchParams(searchParams);
            params.set('cursorId', cursorId.toString());

            const response = await fetch(`http://localhost:5086/api/logging/logs?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const nextResponse = await response.json();

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
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError('An unknown error occured');
            }
        }
        finally {
            setIsFetching(false);
        }
    };

    return {
        logs,
        hasMore,
        isFetching,
        loadMoreLogs,
        error
    };
}