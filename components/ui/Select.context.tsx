"use client";

import { createContext } from "react";

export const SelectContext = createContext<{ size: "sm" | "md" }>({ size: "sm" });
