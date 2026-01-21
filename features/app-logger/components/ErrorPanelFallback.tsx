export function ErrorPanelFallback() {
    return (
        <div className="ml-1 mr-2 mt-2 h-24">
            <div className="h-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm dark:border-gray-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="h-full overflow-x-auto overflow-y-hidden scroll-bar">
                    <div className="h-full flex items-center justify-start gap-3 w-max">
                        {Array.from({ length: 50 }).map((_, index) => (
                            <div
                                key={index}
                                className="select-none relative cursor-pointer group h-10 px-4 rounded-lg text-sm flex items-center justify-center border border-gray-300/80 dark:border-gray-600/70 bg-white/60 dark:bg-white/0 shadow-[0_4px_14px_-8px_rgba(0,0,0,0.35)] shrink-0 w-28 animate-pulse">
                                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">Loading</span>
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-5 min-w-5 rounded-full px-1 bg-gray-300 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
