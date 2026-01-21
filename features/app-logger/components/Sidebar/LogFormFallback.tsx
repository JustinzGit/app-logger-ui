export function LogFormFallback() {
    return (
        <form className="w-full">
            <div className="mb-2 flex justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span className="uppercase tracking-wide">APP LOGGER</span>
            </div>

            <div className="mb-4 h-px w-full bg-gray-200 dark:bg-white/10" />

            {/* Apps Multi-Select Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Apps</div>
            </div>

            {/* Levels Multi-Select Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Levels</div>
            </div>

            {/* Included Namespaces Multi-Select Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Included Namespaces</div>
            </div>

            {/* Excluded Namespaces Multi-Select Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Excluded Namespaces</div>
            </div>

            {/* Limit SingleSelect Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Limit</div>
            </div>

            {/* Sort SingleSelect Skeleton */}
            <div className="mb-3 h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400">Sort</div>
            </div>

            {/* Date/Time Fields Skeleton */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
                <div className="h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Start Date</div>
                </div>
                <div className="h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Start Time</div>
                </div>
                <div className="h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">End Date</div>
                </div>
                <div className="h-13 bg-gray-200 dark:bg-white/5 rounded flex items-center px-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">End Time</div>
                </div>
            </div>

            {/* Buttons (disabled to mirror real form) */}
            <div className="mt-3 pt-4 flex gap-2 border-t border-gray-200 dark:border-white/10">
                <button
                    type="submit"
                    disabled
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed animate-pulse">
                    Search
                </button>

                <button
                    type="button"
                    disabled
                    className="cursor-pointer text-sm flex-1 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed animate-pulse">
                    Reset
                </button>
            </div>
        </form>
    );
}
