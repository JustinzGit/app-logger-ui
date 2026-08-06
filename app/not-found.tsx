import Image from "next/image";

export default function NotFound() {
    const basePattern = 'ACGT';    
    const generateRandomDNA = (length: number) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += basePattern[Math.floor(Math.random() * basePattern.length)];
        }
        return result;
    };
    
    const bgLines = Array(400).fill(0).map(() => generateRandomDNA(500)).join('\n');

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
            
            {/* DNA Background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
                <pre className="absolute inset-0 font-mono text-xs text-baylor-blue-100 whitespace-pre leading-tight overflow-hidden">
                    {bgLines}
                </pre>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <h1 className="text-8xl font-bold text-white mb-4">404</h1>
                <div className="relative w-full max-w-5xl px-4">
                    <Image
                        priority
                        height={800}
                        width={1200}
                        src="/404.png"
                        alt="404 - Page Not Found"
                        className="w-full h-auto object-contain rounded-2xl"
                    />
                </div>
                <div className="mt-10 text-center">
                    <a href="/" className="inline-block cursor-pointer text-sm px-6 bg-cyan-400 text-black py-2 rounded border-2 border-white disabled:opacity-70 disabled:cursor-not-allowed">
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
