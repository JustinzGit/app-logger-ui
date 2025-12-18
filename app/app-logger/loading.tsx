import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-baylor-blue-400 flex items-center justify-center">
            <div className="relative grid place-items-center">
                <div className="absolute inset-0 rounded-full opacity-20 blur-3xl bg-linear-to-b from-baylor-blue-200 via-baylor-blue-100 to-transparent animate-[floatAround_3s_ease-in-out_infinite]" />
                <Image
                    priority
                    width={500}
                    height={500}
                    alt="App Logger Logo"
                    src="/app-logger/app-logger-logo.png"
                    className="relative z-10"
                />
                <div className="w-[350px] h-[350px] border-5 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-baylor-blue-300 border-t-transparent animate-spin z-20" />
            </div>
        </div>
    )
}