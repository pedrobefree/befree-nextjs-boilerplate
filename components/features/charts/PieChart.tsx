"use client";

import {
    PieChart as RechartsPieChart,
    Pie,
    Tooltip,
    Legend,
    Cell
} from "recharts";
import {
    ChartContainer,
    ChartTooltipContent,
    ChartLegendContent,
    chartColors
} from "./charts-base";

interface PieChartProps {
    data: Record<string, unknown>[];
    category: string;
    index: string;
    colors?: string[];
    valueFormatter?: (value: number | string) => string;
    height?: number | string;
    showLegend?: boolean;
    variant?: "pie" | "donut";
}

export const PieChart = ({
    data,
    category,
    index,
    colors = [
        chartColors.brand,
        chartColors.success,
        chartColors.warning,
        chartColors.error,
        chartColors.blue
    ],
    valueFormatter = (value: number | string) => value.toString(),
    height = 300,
    showLegend = true,
    variant = "pie",
}: PieChartProps) => {
    return (
        <ChartContainer height={height}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={variant === "donut" ? "60%" : 0}
                    outerRadius="80%"
                    paddingAngle={2}
                    dataKey={category}
                    nameKey={index}
                >
                    {data.map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                    ))}
                </Pie>
                <Tooltip
                    content={<ChartTooltipContent formatter={valueFormatter} />}
                />
                {showLegend && (
                    <Legend
                        content={<ChartLegendContent />}
                        verticalAlign="bottom"
                        align="center"
                    />
                )}
            </RechartsPieChart>
        </ChartContainer>
    );
};
