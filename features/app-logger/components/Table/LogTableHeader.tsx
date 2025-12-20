export default function LogTableHeader() {
    const baseHeader = "h-10 bg-baylor-blue-400 sticky top-0 z-10 text-center text-[13px] text-white";
    return (
        <thead>
            <tr>
                <th scope="col" className={`${baseHeader} w-30 rounded-tl-md`}>App</th>
                <th scope="col" className={`${baseHeader} w-22.5`}>Level</th>
                <th scope="col" className={`${baseHeader} w-40`}>Namespace</th>
                <th scope="col" className={`${baseHeader} w-44`}>
                    <div className="flex items-center justify-center gap-1">
                        <span>Date Time</span>
                    </div>
                </th>
                <th scope="col" className={`${baseHeader} w-auto rounded-tr-md`}>Message</th>
            </tr>
        </thead>
    )
}