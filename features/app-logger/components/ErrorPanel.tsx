'use client'

import { redirect } from "next/navigation";

export function ErrorPanel({ errorCounts, apps }: { errorCounts: { app: string; count: number }[], apps: string[] }) {

    const countedApps = errorCounts.map(e => e.app);
    const zeroCountApps = apps.filter(a => !countedApps.includes(a)).map(a => ({ app: a, count: 0 }));
    const displayCounts = [...errorCounts, ...zeroCountApps];

    function showAppErrors(appName: string) {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");
        redirect(`/app-logger?pageNumber=1&pageSize=100&logDay=${day}&startDateTime=${date}&Apps=${appName}&Levels=Error`);
    }

    return (
        <div className="bg-baylor-gray-100 ml-1 mr-2 mt-2 h-20 rounded-md border border-gray-300 shadow-sm dark:border-white/10 dark:shadow-none">
            <div className="h-full px-3 overflow-x-auto overflow-y-hidden scroll-bar">
                <div className="h-full flex items-center justify-start gap-4 w-max">
                    {displayCounts.map(error => (
                        <div
                            key={error.app}
                            onClick={() => showAppErrors(error.app)}
                            className="relative cursor-pointer bg-stone-50 h-10 px-3 rounded-lg text-sm flex items-center justify-center border border-stone-300 shadow-sm whitespace-nowrap shrink-0 dark:bg-white/10 dark:border-white/10 dark:text-white text-[13px]">
                            {error.app}

                            <span className={`${error.count > 0 ? 'bg-red-600' : 'bg-baylor-blue-200'} absolute -top-2 -right-2 inline-flex items-center justify-center h-5 min-w-5 rounded-full px-1 text-xs font-semibold text-white ring-2 ring-stone-50 dark:ring-gray-900`}>
                                {error.count}
                            </span>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}