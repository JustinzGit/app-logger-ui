"use client"

import { createContext, useContext, useTransition, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface NavigationContextType {
    isPending: boolean;
    refresh: () => void;
    navigate: (url: string) => void;
    loading: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children, loading = false }: { children: ReactNode; loading?: boolean; }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const navigate = (url: string) => {
        startTransition(() => router.push(url));
    };

    const refresh = () => {
        startTransition(() => router.refresh());
    };

    return (
        <NavigationContext.Provider value={{ isPending, navigate, refresh, loading }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigationContext() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigationContext must be used within NavigationProvider");
    }
    return context;
}
