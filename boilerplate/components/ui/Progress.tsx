"use client";


import { cn } from "@/lib/utils"

interface ProgressProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    className?: string;
    variant?: "brand" | "success" | "warning" | "error";
}

export const Progress = ({ value, max = 100, size = "md", className, variant = "brand" }: ProgressProps) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants = {
        brand: "bg-brand-600",
        success: "bg-success-600",
        warning: "bg-warning-600",
        error: "bg-error-600"
    };

    return (
        <div className={cn("w-full bg-gray-100 rounded-full overflow-hidden",
            size === "sm" && "h-1.5",
            size === "md" && "h-2",
            size === "lg" && "h-3",
            className
        )}>
            <div
                className={cn("h-full transition-all duration-500 rounded-full", variants[variant])}
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}
