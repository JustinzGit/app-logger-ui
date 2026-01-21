export function LogFormFallback() {
    return (
        <form className="w-full">
            <div className="mb-2 flex justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span className="uppercase tracking-wide">APP LOGGER</span>
            </div>

            <div className="mb-4 h-px w-full bg-gray-200 dark:bg-white/10" />

            {/* Apps Multi-Select Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Apps</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Levels Multi-Select Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Levels</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Included Namespaces Multi-Select Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Included Namespaces</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Excluded Namespaces Multi-Select Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Excluded Namespaces</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Limit SingleSelect Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Limit</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Sort SingleSelect Skeleton */}
            <div className="mb-3 animate-pulse">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sort</div>
                <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded" />
            </div>

            {/* Date/Time Fields Skeleton */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-white/5 rounded" />
                </div>
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Time</div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-white/5 rounded" />
                </div>
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-white/5 rounded" />
                </div>
                <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">End Time</div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-white/5 rounded" />
                </div>
            </div>

            {/* Buttons (disabled to mirror real form) */}
            <div className="mt-6 pt-4 flex gap-2 border-t border-gray-200 dark:border-white/10">
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
