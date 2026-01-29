"use client";

import { createContext } from "react";

export const ButtonGroupContext = createContext<{ size: "sm" | "md" | "lg" }>({ size: "md" });
