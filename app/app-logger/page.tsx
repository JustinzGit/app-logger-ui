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
        <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-1">
            <div className="bg-gray-200 row-span-2">
                <LogForm 
                    apps={apps}
                />
            </div>

            <div>
                <ErrorPanel 
                    errorCounts={errorCounts} 
                />
            </div>

            <div className="col-start-2 row-start-2 min-h-0">
                <div className="h-full flex flex-col min-h-0">
                    <div className="flex-1 min-h-0 overflow-auto overflow-x-hidden log-table-scroll-bar">
                        <LogTable
                            logResponse={logResponse}
                        />
                    </div>
                    <Pagination
                        pagedList={logResponse}
                    />
                </div>
            </div>
        </div>
    );
}