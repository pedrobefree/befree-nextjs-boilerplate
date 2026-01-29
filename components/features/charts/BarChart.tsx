"use client";

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import {
    ChartContainer,
    ChartTooltipContent,
    ChartLegendContent,
    chartColors
} from "./charts-base";

interface BarChartProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: any) => string;
    height?: number | string;
    showLegend?: boolean;
    showGrid?: boolean;
    layout?: "vertical" | "horizontal";
    stacked?: boolean;
}

export const BarChart = ({
    data,
    categories,
    index,
    colors = [chartColors.brand, chartColors.success],
    valueFormatter = (value: any) => value.toString(),
    height = 300,
    showLegend = true,
    showGrid = true,
    layout = "horizontal",
    stacked = false,
}: BarChartProps) => {
    return (
        <ChartContainer height={height}>
            <RechartsBarChart
                data={data}
                layout={layout}
                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={layout === "vertical"}
                        horizontal={layout === "horizontal"}
                        stroke="#F2F4F7"
                    />
                )}
                <XAxis
                    dataKey={layout === "horizontal" ? index : undefined}
                    type={layout === "horizontal" ? "category" : "number"}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 12 }}
                    dy={layout === "horizontal" ? 10 : 0}
                    hide={layout === "vertical"}
                />
                <YAxis
                    dataKey={layout === "vertical" ? index : undefined}
                    type={layout === "vertical" ? "category" : "number"}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 12 }}
                    tickFormatter={layout === "horizontal" ? valueFormatter : undefined}
                    width={layout === "vertical" ? 80 : undefined}
                />
                <Tooltip
                    content={<ChartTooltipContent formatter={valueFormatter} />}
                    cursor={{ fill: "#F9FAFB" }}
                />
                {showLegend && (
                    <Legend
                        content={<ChartLegendContent />}
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: 20 }}
                    />
                )}
                {categories.map((category, idx) => (
                    <Bar
                        key={category}
                        dataKey={category}
                        fill={colors[idx % colors.length]}
                        stackId={stacked ? "a" : undefined}
                        radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
                        barSize={32}
                    />
                ))}
            </RechartsBarChart>
        </ChartContainer>
    );
};
