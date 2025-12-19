'use client'

import { useNavigationContext } from "./NavigationContext";

export function ErrorPanel({ errorCounts, appNames }: { errorCounts: { app: string; count: number }[], appNames: string[] }) {
    const { navigate } = useNavigationContext();

    const countedApps = errorCounts.map(e => e.app);
    const zeroCountApps = appNames.filter(a => !countedApps.includes(a)).map(a => ({ app: a, count: 0 }));
    const displayCounts = [...errorCounts, ...zeroCountApps];

    function showAppErrors(appName: string) {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");
        navigate(`/app-logger?pageNumber=1&pageSize=100&logDay=${day}&startDateTime=${date}&Apps=${appName}&Levels=Error`);
    }

    return (
        <div className="ml-1 mr-2 mt-2 h-20 overflow-hidden">
            <div className="h-full px-3 overflow-x-auto overflow-y-hidden scroll-bar">
                <div className="h-full flex items-center justify-start gap-3 w-max">
                    {displayCounts.map(error => (
                        <div
                            key={error.app}
                            onClick={() => showAppErrors(error.app)}
                            className="select-none relative cursor-pointer group h-10 px-4 rounded-lg text-sm flex items-center justify-center border border-gray-300 dark:border-gray-600 whitespace-nowrap shrink-0 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-transparent dark:text-white text-gray-700 text-[13px]">
                            {error.app}

                            <span className={`${error.count > 0 ? 'bg-red-500' : 'bg-blue-400'} absolute -top-2 -right-2 inline-flex items-center justify-center h-5 min-w-5 rounded-full px-1 text-xs font-semibold text-white ring-2 ring-white dark:ring-gray-900 transition-all duration-200 group-hover:scale-110`}>
                                {error.count}
                            </span>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}