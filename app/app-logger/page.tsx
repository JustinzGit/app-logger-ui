import LogTable from "@/features/app-logger/components/LogTable";
import { logResponse } from "@/features/app-logger/actions";

export default function AppLogger() {
    return (
        <div className="h-screen grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-1">
            <div className="bg-yellow-400 row-span-2">
                1
            </div>

            <div className="bg-green-400">
                2
            </div>

            <div className="col-start-2 row-start-2 min-h-0">
                <div className="h-full flex flex-col min-h-0">
                    <div className="flex-1 min-h-0 overflow-auto">
                        <LogTable logResponse={logResponse}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
