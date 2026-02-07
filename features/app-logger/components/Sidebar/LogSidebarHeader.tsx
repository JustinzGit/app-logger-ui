"use client"

import Image from "next/image";
import { useNavigationContext } from "../NavigationContext";
import { usePathname } from "next/navigation";

export default function LogSidebarHeader() {
    const pathname = usePathname();
    const { isPending, navigate } = useNavigationContext();

    function onLogoClick() {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");
        const query = new URLSearchParams({ startDateTime: date, logDay: day, limit: '50', sortAscending: 'true' });
        navigate(`${pathname}?${query.toString()}`);
    }

    return (
        <div className="bg-slate-50 dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
            <div onClick={onLogoClick} className="cursor-pointer relative grid place-items-center">
                <div className="absolute inset-0 rounded-full opacity-20 blur-3xl bg-linear-to-b from-baylor-blue-200 via-baylor-blue-100 to-transparent dark:from-baylor-blue-300 dark:via-baylor-blue-300/50 animate-[floatAround_3s_ease-in-out_infinite]" />
                <Image
                    priority
                    width={220}
                    height={220}
                    alt="App Logger Logo"
                    src="/app-logger/app-logger-logo.png"
                    className="relative z-10"
                />
                {isPending && <div className="w-[150px] h-[150px] border-5 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-baylor-blue-300 border-t-transparent animate-spin z-20" />}
            </div>
        </div>
    );
}