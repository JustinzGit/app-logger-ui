'use client'

interface ILogTableFooterProps {
    hasMoreLogs: boolean;
    totalResults: number;
    isFetching: boolean;
    loadMoreLogs: () => void;
}

export default function LogTableFooter({ totalResults, loadMoreLogs, hasMoreLogs, isFetching }: ILogTableFooterProps) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-transparent">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

                <div className="whitespace-nowrap text-sm text-gray-500">
                    Showing {totalResults.toLocaleString()} {totalResults === 1 ? 'result' : 'results'}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <button
                        type="button"
                        onClick={loadMoreLogs}
                        disabled={!hasMoreLogs}
                        className="cursor-pointer inline-flex items-center rounded-md bg-baylor-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-baylor-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-baylor-blue-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-baylor-blue-400">
                        {isFetching ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            </div>
        </div>
    );
}
