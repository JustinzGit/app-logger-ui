'use client'

import { IPagedList } from "@/features/shared/types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function Pagination({ pagedList }: { pagedList: IPagedList<any> }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalCount = pagedList.totalCount ?? 0;
    const start = totalCount === 0 ? 0 : (pagedList.pageNumber - 1) * pagedList.pageSize + 1;
    const end = totalCount === 0 ? 0 : Math.min(pagedList.pageNumber * pagedList.pageSize, totalCount);

    function updateQueryString(updates: Partial<IPagedList<any>>) {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            params.set(key, String(value));
        });
        router.push(`?${params.toString()}`);
    }

    function goToPreviousPage() {
        if (!pagedList.hasPreviousPage) return;
        updateQueryString({ pageNumber: pagedList.pageNumber - 1 });
    }

    function goToNextPage() {
        if (!pagedList.hasNextPage) return;
        updateQueryString({ pageNumber: pagedList.pageNumber + 1 });
    }

    function handlePageSizeChange(event: ChangeEvent<HTMLSelectElement>) {
        updateQueryString({ pageSize: Number(event.target.value), pageNumber: 1 });
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-transparent">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

                {pagedList.totalCount !== null && (
                    <div className="whitespace-nowrap text-sm text-gray-500">
                        Showing {start.toLocaleString()}–{end.toLocaleString()} of {totalCount.toLocaleString()}
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <span>Rows per page:</span>

                        <div className="grid grid-cols-1">
                            <select
                                id="pageSize"
                                name="pageSize"
                                onChange={handlePageSizeChange}
                                value={String(pagedList.pageSize)}
                                className="cursor-pointer col-start-1 row-start-1 appearance-none rounded-md bg-white py-1 pr-7 pl-2 text-sm outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-baylor-blue-100 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500">
                                <option value="100">100</option>
                                <option value="150">150</option>
                                <option value="200">200</option>
                            </select>

                            <ExpandMoreIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-1 size-4 self-center justify-self-end text-gray-500 dark:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <nav aria-label="Pagination" className="isolate inline-flex items-center gap-1">
                            <button
                                type="button"
                                aria-label="Previous page"
                                onClick={goToPreviousPage}
                                disabled={!pagedList.hasPreviousPage}
                                className="hover:cursor-pointer inline-flex items-center rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-white/10">
                                <ChevronLeftIcon fontSize="small" />
                            </button>

                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page <span className="font-medium">{pagedList.pageNumber}</span>
                            </span>

                            <button
                                type="button"
                                aria-label="Next page"
                                onClick={goToNextPage}
                                disabled={!pagedList.hasNextPage}
                                className="hover:cursor-pointer inline-flex items-center rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-white/10">
                                <ChevronRightIcon fontSize="small" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
