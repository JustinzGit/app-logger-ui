'use client'

import { ErrorPanel } from "@/features/app-logger/components/ErrorPanel";
import { NavigationProvider } from "@/features/app-logger/components/NavigationContext";
import LogSidebar from "@/features/app-logger/components/Sidebar/LogSidebar";
import { Logging } from "@/features/app-logger/components/Table/Logging";
import { useAppNames, useLogs } from "@/features/app-logger/actions";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import Error from "./error"

export default function AppLogger() {
    const params = useSearchParams();
    const { data: appNames, error: appNameError } = useAppNames();
    const { data: logResponse, loading: logsLoading, error: logsError } = useLogs(params);

    if (appNameError || logsError) return <Error />
    if (!logResponse) return <Loading />
    return (
        <NavigationProvider loading={logsLoading}>
            <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                <div className="row-span-2 flex flex-col items-center">
                    <LogSidebar
                        appNames={appNames}
                    />
                </div>

                <div>
                    <ErrorPanel
                        appNames={appNames}
                    />
                </div>

                <div className="col-start-2 row-start-2 min-h-0">
                    <Logging
                        logResponse={logResponse}
                        key={JSON.stringify(params) + Date.now()}
                    />
                </div>
            </div>
        </NavigationProvider>
    );
}