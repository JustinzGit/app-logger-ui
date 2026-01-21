import { SearchParams } from "next/dist/server/request/search-params";
import { ErrorPanel } from "@/features/app-logger/components/ErrorPanel";
import { ErrorPanelFallback } from "@/features/app-logger/components/ErrorPanelFallback";
import { getAppNames, getErrorCounts, getLogs, getNameSpaces } from "@/features/app-logger/actions";
import { NavigationProvider } from "@/features/app-logger/components/NavigationContext";
import LogSidebar from "@/features/app-logger/components/Sidebar/LogSidebar";
import { Logging } from "@/features/app-logger/components/Table/Logging";
import { Suspense } from "react";

export default async function AppLogger({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;

    const appNames = getAppNames();
    const namespaces = getNameSpaces();
    const errorCounts = getErrorCounts();
    const logResponse = await getLogs(params);

    return (
        <NavigationProvider>
            <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                <div className="row-span-2 flex flex-col items-center">
                    <LogSidebar
                        appNames={appNames}
                        namespaces={namespaces}
                    />
                </div>

                <div>
                    <Suspense fallback={<ErrorPanelFallback />}>
                        <ErrorPanel
                            appNames={appNames}
                            errorCounts={errorCounts}
                        /> 
                    </Suspense>
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