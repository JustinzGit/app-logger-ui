'use client'

import { usePathname } from "next/navigation";
import { useNavigationContext } from "./NavigationContext";

export function ErrorPanel({ errorCounts, appNames }: { errorCounts: { app: string; count: number }[], appNames: string[] }) {
    const pathname = usePathname();
    const { navigate } = useNavigationContext();

    const countedApps = errorCounts.map(e => e.app);
    const zeroCountApps = appNames.filter(a => !countedApps.includes(a)).map(a => ({ app: a, count: 0 }));
    const displayCounts = [...errorCounts, ...zeroCountApps];

    function showAppErrors(appName: string) {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");
        navigate(`${pathname}?limit=${100}&logDay=${day}&startDateTime=${date}&Apps=${appName}&Levels=Error`);
    }

    return (
        <div className="ml-1 mr-2 mt-2 h-24">
            <div className="h-full rounded-xl border border-gray-200 px-3 py-2 shadow-sm dark:border-gray-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="h-full overflow-x-auto overflow-y-hidden scroll-bar">
                    <div className="h-full flex items-center justify-start gap-3 w-max">
                        {displayCounts.map(error => (
                            <div
                                key={error.app}
                                onClick={() => showAppErrors(error.app)}
                                className="select-none relative cursor-pointer group h-10 px-4 rounded-lg text-sm flex items-center justify-center border border-gray-300/80 dark:border-gray-600/70 whitespace-nowrap shrink-0 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-white/70 dark:hover:bg-white/5 bg-white/60 dark:bg-white/0 dark:text-white text-gray-800 text-[13px] shadow-[0_4px_14px_-8px_rgba(0,0,0,0.35)]">
                                {error.app}

                                <span className={`${error.count > 0 ? 'bg-red-500' : 'bg-baylor-blue-300'} absolute -top-2 -right-2 inline-flex items-center justify-center h-5 min-w-5 rounded-full px-1 text-xs font-semibold text-white ring-2 ring-white dark:ring-gray-900 transition-all duration-200 group-hover:scale-110`}>
                                    {error.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}