"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/app-logger/loading";

export default function ClientRouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const isRoot = pathname === '/';
        const isAppLogger = pathname === '/app-logger';
        const hasNoParams = searchParams.toString() === '';

        if (isRoot || (isAppLogger && hasNoParams)) {
            setIsRedirecting(true); 

            const today = new Date();
            const day = today.getDate().toString();
            const date = today.toLocaleDateString("en-CA");

            const newParams = new URLSearchParams();
            newParams.set('sortDescending', 'false');
            newParams.set('startDateTime', date);
            newParams.set('logDay', day);
            newParams.set('limit', '50');

            router.replace(`/app-logger?${newParams.toString()}`);
        } 
        else {
            setIsRedirecting(false);
        }
    }, [pathname, searchParams, router]);

    if (isRedirecting) {
        return <Loading />;
    }

    return <>{children}</>;
}