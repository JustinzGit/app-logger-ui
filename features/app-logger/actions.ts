import { SearchParams } from "next/dist/server/request/search-params";
import { IPagedList } from "@/features/shared/types"
import { ILog } from "@/features/app-logger/types";
import { toQueryString } from "../shared/utils";

export async function getLogs(params: SearchParams): Promise<IPagedList<ILog>> {
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

export async function getApps(): Promise<string[]> {
    const response = await fetch(`http://localhost:5086/api/logging/apps`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch apps");
    return response.json();
}