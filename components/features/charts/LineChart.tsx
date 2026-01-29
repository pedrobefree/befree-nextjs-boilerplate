"use client";

import {
    LineChart as RechartsLineChart,
    Line,
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
    ChartActiveDot,
    chartColors
} from "./charts-base";

interface LineChartProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: any) => string;
    height?: number | string;
    showLegend?: boolean;
    showGrid?: boolean;
}

export const LineChart = ({
    data,
    categories,
    index,
    colors = [chartColors.brand, chartColors.success],
    valueFormatter = (value: any) => value.toString(),
    height = 300,
    showLegend = true,
    showGrid = true,
}: LineChartProps) => {
    return (
        <ChartContainer height={height}>
            <RechartsLineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#F2F4F7"
                    />
                )}
                <XAxis
                    dataKey={index}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 12 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 12 }}
                    tickFormatter={valueFormatter}
                />
                <Tooltip
                    content={<ChartTooltipContent formatter={valueFormatter} />}
                    cursor={{ stroke: "#F2F4F7", strokeWidth: 1 }}
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
                    <Line
                        key={category}
                        type="monotone"
                        dataKey={category}
                        stroke={colors[idx % colors.length]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={<ChartActiveDot />}
                    />
                ))}
            </RechartsLineChart>
        </ChartContainer>
    );
};
