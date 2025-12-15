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