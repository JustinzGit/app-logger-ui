export interface IPagedList<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}