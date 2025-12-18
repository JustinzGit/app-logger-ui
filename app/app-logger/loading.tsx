'use client'
import Image from "next/image";

export default function Loading() {
    
    const logLines = [
        "[INFO] Application started successfully",
        "[DEBUG] Loading configuration files",
        "[WARN] Cache miss detected",
        "[ERROR] Connection timeout",
        "[INFO] Processing request batch",
        "[DEBUG] Memory usage: 45%",
        "[INFO] User authentication complete",
        "[WARN] Slow query detected",
        "[ERROR] Failed to connect to database",
        "[INFO] Background job completed",
        "[DEBUG] Validating input parameters",
        "[INFO] Transaction committed",
        "[DEBUG] Sequencing DNA strand ATCGGTA...",
        "[INFO] CRISPR edit successful on chromosome 7",
        "[WARN] Mitochondrial DNA shows unusual mutation",
        "[ERROR] PCR amplification failed - insufficient primers",
        "[INFO] RNA polymerase transcription initiated",
        "[DEBUG] Analyzing protein folding pattern",
        "[WARN] Telomere length below optimal threshold",
        "[INFO] Gene expression profile: upregulated",
        "[ERROR] Helicase enzyme not responding",
        "[DEBUG] Base pair sequence verification: 99.7% match",
        "[INFO] Codon translation: START -> Methionine",
        "[WARN] Ribosome stalling detected at position 1247",
        "[INFO] Allele frequency calculated successfully",
        "[ERROR] DNA ligase missing - cannot seal nick",
        "[DEBUG] Checking if Schrödinger's cat is alive...",
        "[INFO] Quantum entanglement established",
        "[WARN] Higgs boson feeling a bit massive today",
        "[ERROR] Electron lost in orbital - last seen at 2p",
        "[DEBUG] Pi calculated to 1000 digits (for fun)",
        "[INFO] E=mc² validation passed",
        "[WARN] Entropy increasing as expected",
        "[ERROR] Cold fusion still not working",
        "[INFO] Avogadro counting molecules... 6.02e23",
        "[DEBUG] Photon traveling at c (shocker)",
        "[WARN] Time dilation detected near deadline",
        "[INFO] Double helix unzipped successfully",
        "[ERROR] Pangea reunion cancelled",
        "[DEBUG] Testing gravity... still working!",
        "[INFO] Evolution.exe running for 3.8 billion years",
        "[WARN] Natural selection buffer overflow",
    ];

    const rightLogLines = logLines.map(line => {
        const match = line.match(/^\[(\w+)\] (.+)$/);
        if (match) {
            return `${match[2]} [${match[1]}]`;
        }
        return line;
    });

    return (
        <div className="fixed inset-0 bg-baylor-blue-400 flex items-center justify-center overflow-hidden">

            {/* Left side logs */}
            <div className="absolute left-4 top-0 bottom-0 w-100 opacity-20 overflow-hidden">
                <div className="animate-[scrollUp_20s_linear_infinite] space-y-2 text-xs text-white font-mono">
                    {[...logLines, ...logLines, ...logLines].map((line, i) => (
                        <div key={i} className="whitespace-nowrap">{line}</div>
                    ))}
                </div>
            </div>

            {/* Right side logs */}
            <div className="absolute right-4 top-0 bottom-0 w-100 opacity-20 overflow-hidden text-right">
                <div className="animate-[scrollUp_35s_linear_infinite] space-y-2 text-xs text-white font-mono">
                    {[...rightLogLines, ...rightLogLines, ...rightLogLines].map((line, i) => (
                        <div key={i} className="whitespace-nowrap">{line}</div>
                    ))}
                </div>
            </div>

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