"use client"

import { createContext, useContext, useTransition, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface NavigationContextType {
    isPending: boolean;
    navigate: (url: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const navigate = (url: string) => {
        startTransition(() => router.push(url));
    };

    return (
        <NavigationContext.Provider value={{ isPending, navigate }}>
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
