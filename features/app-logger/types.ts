export type LogLevel = "Debug" | "Information" | "Warning" | "Error";

export interface ILog {
    id: number;
    logTime: string;
    logDay: number;
    server: string;
    app: string;
    sourceContext: string | null;
    level: string;
    message: string;
    exception: string | null;
    account: string | null;
}

export interface ILogResponse {
    logs: ILog[];
    limit: number;
    hasMore: boolean;
    cursorId: number | null;
}