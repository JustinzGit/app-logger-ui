import { IPagedList } from "@/features/shared/types";
import LogTable from "./LogTable";
import { ILog } from "../../types";
import Pagination from "./Pagination";

export function LogTableSection({ logResponse }: { logResponse: IPagedList<ILog> }) {
    return (
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
    )
}