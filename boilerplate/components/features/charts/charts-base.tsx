"use client";

import type { ReactNode } from "react";
import {
    ResponsiveContainer,
} from "recharts";
import { cx } from "@/lib/utils";

// ============================================
// Chart Layout & Containers
// ============================================

export const ChartContainer = ({ children, className, height = 300 }: { children: ReactNode; className?: string; height?: number | string }) => (
    <div className={cx("w-full", className)} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
            {children as React.ReactElement}
        </ResponsiveContainer>
    </div>
);

// ============================================
// Custom Components
// ============================================

interface ChartTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    title?: string;
    formatter?: (value: any) => string;
}

export const ChartTooltipContent = ({ active, payload, label, title, formatter }: ChartTooltipProps) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="rounded-lg bg-gray-900 px-3 py-2 shadow-xl border border-gray-800">
            {label && <p className="mb-1 text-xs font-semibold text-white uppercase tracking-wider">{label}</p>}
            {title && <p className="mb-2 text-xs text-gray-400">{title}</p>}
            <div className="space-y-1.5">
                {payload.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-300">{item.name}:</span>
                        <span className="text-xs font-semibold text-white">
                            {formatter ? formatter(item.value) : item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ChartLegendContent = ({ payload, vertical = false }: { payload?: any[]; vertical?: boolean }) => {
    if (!payload?.length) return null;

    return (
        <div className={cx("flex flex-wrap gap-4 pt-4", vertical ? "flex-col" : "justify-center items-center")}>
            {payload.map((entry: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                    <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-medium text-gray-600">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export const ChartActiveDot = (props: { cx?: number; cy?: number; fill?: string; strokeWidth?: number }) => {
    const { cx: x, cy: y, fill, strokeWidth } = props;
    return (
        <g>
            <circle cx={x} cy={y} r={6} fill={fill} fillOpacity={0.2} />
            <circle cx={x} cy={y} r={4} fill={fill} stroke="#FFFFFF" strokeWidth={strokeWidth || 2} />
        </g>
    );
};

// ============================================
// Utilities
// ============================================

export const selectEvenlySpacedItems = <T,>(items: T[], maxItems: number): T[] => {
    if (items.length <= maxItems) return items;
    const step = Math.ceil(items.length / maxItems);
    return items.filter((_, index) => index % step === 0);
};

export const chartColors = {
    brand: "#7F56D9",
    brandDark: "#6941C6",
    success: "#12B76A",
    warning: "#F79009",
    error: "#F04438",
    blue: "#2E90FA",
    gray: "#667085",
    teal: "#0E9384",
    orange: "#FB6514",
    purple: "#9B8AFB",
};
