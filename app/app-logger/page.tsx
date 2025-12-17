import Image from "next/image";
import { SearchParams } from "next/dist/server/request/search-params";
import { IPagedList } from "@/features/shared/types";
import LogTable from "@/features/app-logger/components/LogTable";
import { ILog } from "@/features/app-logger/types";
import { redirect } from "next/navigation";
import Pagination from "@/features/app-logger/components/Pagination";
import { ErrorPanel } from "@/features/app-logger/components/ErrorPanel";
import LogForm from "@/features/app-logger/components/LogForm";
import { getApps, getErrorCounts, getLogs } from "@/features/app-logger/actions";

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

    return (
        <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <div className="row-span-2 flex flex-col items-center">
                <div className="mt-2 bg-white dark:bg-gray-800 w-80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
                    <div className="bg-linear-to-br from-baylor-blue-400 to-baylor-blue-300 p-6 flex justify-center items-center">
                        <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-500 relative overflow-hidden">
                            <Image
                                priority
                                width={220}
                                height={220}
                                alt="App Logger Logo"
                                src="/app-logger/app-logger-logo.png"
                            />
                            {/* <div className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/70 to-transparent rounded-lg"></div> */}
                        </div>
                    </div>
                    
                    <div className="p-6 flex justify-center items-center">
                        <LogForm
                            apps={apps}
                        />
                    </div>
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
                    <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden log-table-scroll-bar">
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
    );
}