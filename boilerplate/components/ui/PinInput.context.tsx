"use client";

import { createContext, useContext } from "react";

export type PinInputContextType = {
    size: "sm" | "md" | "lg";
    disabled: boolean;
    id: string;
};

export const PinInputContext = createContext<PinInputContextType | null>(null);

export const usePinInputContext = () => {
    const context = useContext(PinInputContext);

    if (!context) {
        throw new Error("The 'usePinInputContext' hook must be used within a '<PinInput />'");
    }

    return context;
};
