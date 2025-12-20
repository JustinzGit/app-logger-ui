import { SearchParams } from "next/dist/server/request/search-params";
import { IPagedList } from "@/features/shared/types";
import { ILog } from "@/features/app-logger/types";
import { ErrorPanel } from "@/features/app-logger/components/ErrorPanel";
import { getAppNames, getErrorCounts, getLogs } from "@/features/app-logger/actions";
import { NavigationProvider } from "@/features/app-logger/components/NavigationContext";
import LogSidebar from "@/features/app-logger/components/Sidebar/LogSidebar";
import { LogTableSection } from "@/features/app-logger/components/Table/LogTableSection";

export default async function AppLogger({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const errorCounts = await getErrorCounts();
    const appNames: string[] = await getAppNames();
    const logResponse: IPagedList<ILog> = await getLogs(params);

    return (
        <NavigationProvider>
            <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                <div className="row-span-2 flex flex-col items-center">
                    <LogSidebar
                        appNames={appNames}
                        logResponse={logResponse} />
                </div>

                <div>
                    <ErrorPanel
                        appNames={appNames}
                        errorCounts={errorCounts}
                    />
                </div>

                <div className="col-start-2 row-start-2 min-h-0">
                    <LogTableSection
                        logResponse={logResponse}
                    />
                </div>
            </div>
        </NavigationProvider>
    );
}