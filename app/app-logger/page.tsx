import { SearchParams } from "next/dist/server/request/search-params";
import { IPagedList } from "@/features/shared/types";
import LogTable from "@/features/app-logger/components/LogTable";
import { ILog } from "@/features/app-logger/types";
import { redirect } from "next/navigation";
import Pagination from "@/features/app-logger/components/Pagination";
import { ErrorPanel } from "@/features/app-logger/components/ErrorPanel";
import LogForm from "@/features/app-logger/components/LogForm";
import { getApps, getErrorCounts, getLogs } from "@/features/app-logger/actions";
import { NavigationProvider } from "@/features/app-logger/components/NavigationContext";

export default async function AppLogger({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;

    if (Object.keys(params).length === 0) {
        const today = new Date();
        const day = today.getDate().toString();
        const date = today.toLocaleDateString("en-CA");
        redirect(`/app-logger?pageNumber=1&pageSize=100&logDay=${day}&startDateTime=${date}&orderDescending=true`);
    }

    const apps: string[] = await getApps();
    const errorCounts = await getErrorCounts();
    const logResponse: IPagedList<ILog> = await getLogs(params);
    const namespaces = [...new Set(logResponse.items.map(l => l.sourceContext).filter(sc => sc !== null))];

    return (
        <NavigationProvider>
            <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
                <div className="row-span-2 flex flex-col items-center">
                    <div className="mt-2 bg-white dark:bg-gray-800 w-75 h-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                        <LogForm 
                            apps={apps} 
                            namespaces={namespaces} />
                    </div>
                </div>

                <div>
                    <ErrorPanel
                        apps={apps}
                        errorCounts={errorCounts}
                    />
                </div>

                <div className="col-start-2 row-start-2 min-h-0">
                    <div className="h-full flex flex-col min-h-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden scroll-bar">
                            <LogTable
                                logResponse={logResponse}
                            />
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                            <Pagination
                                pagedList={logResponse}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </NavigationProvider>
    );
}