import { SearchParams } from "next/dist/server/request/search-params";

export function toQueryString(params: SearchParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, item));
        }
        else {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams.toString();
}