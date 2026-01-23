'use client'

interface ILogTableFooterProps {
    hasMoreLogs: boolean;
    totalResults: number;
    isFetching: boolean;
    loadMoreLogs: () => void;
}

export default function LogTableFooter({ totalResults, loadMoreLogs, hasMoreLogs, isFetching }: ILogTableFooterProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="hidden sm:block whitespace-nowrap text-sm text-gray-500">
                Showing {totalResults.toLocaleString()} {totalResults === 1 ? 'result' : 'results'}
            </div>

            <div className="flex flex-1 justify-center sm:justify-end">
                <button
                    type="button"
                    onClick={loadMoreLogs}
                    className="cursor-pointer inline-flex items-center rounded-md bg-baylor-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-baylor-blue-300 disabled:opacity-40 disabled:cursor-not-allowed">
                    {isFetching ? 'Loading...' : !hasMoreLogs ? 'Check for Updates' : 'Load More'}
                </button>
            </div>
        </div>
    );
}
