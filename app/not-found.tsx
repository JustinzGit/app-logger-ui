import Image from "next/image";

export default function NotFound() {
    const basePattern = 'ACGT';

    const bgLines = Array(100).fill(0).map(() => 
        basePattern.repeat(100)
    ).join('');

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
            
            {/* DNA Background */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
                <pre className="w-full h-full font-mono text-xs text-baylor-blue-100 whitespace-pre-wrap wrap-break-word overflow-hidden">
                    {bgLines}
                </pre>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <h1 className="text-4xl font-bold text-white mb-4">I SEE YOU</h1>
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
                <div className="mt-4 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                    <a href="/" className="inline-block cursor-pointer text-sm px-6 bg-baylor-blue-400 text-white py-2 rounded disabled:opacity-70 disabled:cursor-not-allowed">
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
