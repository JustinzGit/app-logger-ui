import { ReadonlyURLSearchParams } from "next/navigation";
import { useFetch } from "../shared/hooks/useFetch";
import { ILogResponse } from "./types";

const BASE_URL = "http://localhost:5086/api/logging";

export function useAppNames() {
    return useFetch<string[]>(`${BASE_URL}/app-names`);
}

export function useNameSpaces() {
    return useFetch<string[]>(`${BASE_URL}/name-spaces`);
}

export function useErrorCounts() {
    return useFetch<{ app: string, count: number }[]>(`${BASE_URL}/error-counts`);
}

export function useLogs(params: ReadonlyURLSearchParams) {
    return useFetch<ILogResponse>(`${BASE_URL}/logs?${params.toString()}`);
}
