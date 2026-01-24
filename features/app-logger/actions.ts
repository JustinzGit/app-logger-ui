import { SearchParams } from "next/dist/server/request/search-params";
import { ILogResponse } from "@/features/app-logger/types";
import { toQueryString } from "../shared/utils";

const BASE_URL = "http://localhost:5086/api/logging";

export async function getLogs(params: SearchParams): Promise<ILogResponse> {
    const queryString = toQueryString(params);
    const response = await fetch(`${BASE_URL}/logs?${queryString}`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch logs");
    return response.json();
}

export async function getErrorCounts(): Promise<{ app: string, count: number }[]> {
    const response = await fetch(`${BASE_URL}/error-counts`, { next: { revalidate: 30 } });
    if (!response.ok) throw new Error("Failed to fetch error counts");
    return response.json();
}

export async function getAppNames(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/app-names`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch app names");
    return response.json();
}

export async function getNameSpaces(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/name-spaces`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Failed to fetch namespaces");
    return response.json();
}