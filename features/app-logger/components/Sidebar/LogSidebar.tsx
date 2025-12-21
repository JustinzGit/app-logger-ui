import { ILogResponse } from "../../types";
import LogForm from "./LogForm";
import LogSidebarFooter from "./LogSidebarFooter";
import LogSidebarHeader from "./LogSidebarHeader";

interface ILogSidebarProps {
    appNames: string[];
    logResponse: ILogResponse;
}

export default function LogSidebar({ appNames, logResponse }: ILogSidebarProps) {
    const namespaces = [...new Set(logResponse.logs.map(l => l.sourceContext).filter(sc => sc !== null))];
    return (
        <div className="mt-2 bg-white dark:bg-gray-800 w-75 h-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
            <div className="relative h-full flex flex-col">
                <div className="bg-linear-to-br from-baylor-blue-400 to-baylor-blue-300 p-4 flex justify-center items-center">
                    <LogSidebarHeader />
                </div>

                <div className="p-4 flex justify-center flex-1 overflow-y-auto">
                    <LogForm
                        appNames={appNames}
                        namespaces={namespaces} />
                </div>
                <LogSidebarFooter />
            </div>
        </div>
    );
}