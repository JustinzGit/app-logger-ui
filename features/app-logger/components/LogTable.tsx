import { ILog, IPagedList } from "../actions";

export default function LogTable({ logResponse }: { logResponse: IPagedList<ILog>}) {
    const baseRow = "px-1 py-1 text-[13px] whitespace-nowrap";
    const baseHeader = "h-[40px] bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";

    return (
        <table className="min-w-full table-fixed relative">
            <thead>
                <tr>
                    <th scope="col" className={`${baseHeader} w-[120px] rounded-tl-md`}>App</th>
                    <th scope="col" className={`${baseHeader} w-[90px]`}>Level</th>
                    <th scope="col" className={`${baseHeader} w-[260px]`}>Namespace</th>
                    <th scope="col" className={`${baseHeader} w-[220px]`}>Date Time</th>
                    <th scope="col" className={`${baseHeader} w-auto rounded-tr-md`}>Message</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {logResponse.items.map((log) => (
                    <tr key={log.id}>
                        <td className={`${baseRow} text-center w-[120px] pl-4 pr-3`}>{log.app}</td>
                        <td className={`${baseRow} text-center w-[90px]`}>{log.level}</td>
                        <td className={`${baseRow} text-center w-[260px]`}>{log.sourceContext}</td>
                        <td className={`${baseRow} text-center w-[220px]`}>{log.logTime}</td>
                        <td className={`${baseRow} max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap`}>{log.message}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
