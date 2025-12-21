import { SearchParams } from "next/dist/server/request/search-params";
import { ILog, ILogResponse } from "@/features/app-logger/types";
import { toQueryString } from "../shared/utils";

export async function getLogs(params: SearchParams): Promise<ILogResponse> {
    const queryString = toQueryString(params);
    const response = await fetch(`http://localhost:5086/api/logging/logs?${queryString}`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch logs");
    return response.json();
}

export async function getErrorCounts(): Promise<{ app: string, count: number }[]> {
    const response = await fetch(`http://localhost:5086/api/logging/error-counts`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch error counts");
    return response.json();
}

export async function getAppNames(): Promise<string[]> {
    const response = await fetch(`http://localhost:5086/api/logging/app-names`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch app names");
    return response.json();
}