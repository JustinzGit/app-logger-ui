'use client'
import Image from "next/image";

export default function Error() {
    const logLines = [
        "[ERROR] Fatal exception in log stream",
        "[WARN] Retrying connection to event bus",
        "[ERROR] Disk write failed: I/O error",
        "[DEBUG] Heap snapshot captured for crash report",
        "[INFO] Collecting stack traces",
        "[ERROR] Circuit breaker open on downstream API",
        "[WARN] Config drift detected between nodes",
        "[ERROR] Memory leak suspected in parser",
        "[INFO] Dumping failed request payloads",
        "[DEBUG] Rolling back to last known good build",
        "[ERROR] Authentication token expired mid-flight",
        "[WARN] Shadow traffic diverging from baseline",
        "[ERROR] Dead letter queue overflow",
        "[INFO] Snapshotting DB before recovery",
        "[DEBUG] Tracing cold path anomalies",
        "[ERROR] Panic: nil pointer dereference",
        "[WARN] Latency SLO breach approaching",
        "[ERROR] RAID array degraded: drive offline",
        "[INFO] Correlating alerts across clusters",
        "[DEBUG] Hash mismatch on binary artifacts",
        "[ERROR] TLS handshake terminated abruptly",
        "[WARN] Unapplied migrations found",
        "[ERROR] Message broker heartbeat lost",
        "[INFO] Graceful shutdown initiated",
        "[DEBUG] Retaining crash dumps for 24h",
        "[ERROR] Kernel panic signature recorded",
        "[WARN] Elevated error ratio on /ingest",
        "[ERROR] Orphaned processes detected",
        "[INFO] Paging on-call engineer",
        "[DEBUG] Capturing final metrics window",
    ];

    const rightLogLines = logLines.map(line => {
        const match = line.match(/^\[(\w+)\] (.+)$/);
        if (match) {
            return `${match[2]} [${match[1]}]`;
        }
        return line;
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-linear-to-b from-[#05070f] via-[#0c1527] to-[#05060c] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,68,0,0.14),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,130,246,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.45),transparent_40%)]" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#05070f]/40 to-black/70" />

            <div className="absolute left-4 top-0 bottom-0 w-100 opacity-30 text-baylor-gray-200 overflow-hidden">
                <div className="animate-[scrollUp_22s_linear_infinite] space-y-2 text-xs font-mono">
                    {[...logLines, ...logLines, ...logLines].map((line, i) => (
                        <div key={i} className="whitespace-nowrap">{line}</div>
                    ))}
                </div>
            </div>

            <div className="absolute right-4 top-0 bottom-0 w-100 opacity-25 text-baylor-gray-200 overflow-hidden text-right">
                <div className="animate-[scrollUp_30s_linear_infinite] space-y-2 text-xs font-mono">
                    {[...rightLogLines, ...rightLogLines, ...rightLogLines].map((line, i) => (
                        <div key={i} className="whitespace-nowrap">{line}</div>
                    ))}
                </div>
            </div>

            <div className="relative grid place-items-center">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-linear-to-b from-[#ff3b30] via-[#7f1d1d] to-transparent animate-[floatAround_3s_ease-in-out_infinite]" />
                <Image
                    priority
                    width={500}
                    height={500}
                    alt="App Logger Broken Logo"
                    src="/app-logger/app-logger-broken.png"
                    className="relative z-10 drop-shadow-[0_15px_45px_rgba(0,0,0,0.45)]"
                />
                <div className="absolute -bottom-10 px-4 py-2 text-center text-xs font-mono tracking-[0.35em] uppercase text-baylor-gray-100/90 bg-white/5 border border-baylor-blue-200/30 rounded-full shadow-[0_0_25px_rgba(56,130,246,0.25)] backdrop-blur">
                    error detected
                </div>
            </div>
        </div>
    )
}