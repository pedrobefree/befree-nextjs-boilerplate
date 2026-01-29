"use client";

import {
    AreaChart as RechartsAreaChart,
    Area,
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

interface AreaChartProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: any) => string;
    height?: number | string;
    showLegend?: boolean;
    showGrid?: boolean;
    showGradient?: boolean;
}

export const AreaChart = ({
    data,
    categories,
    index,
    colors = [chartColors.brand, chartColors.success],
    valueFormatter = (value: any) => value.toString(),
    height = 300,
    showLegend = true,
    showGrid = true,
    showGradient = true,
}: AreaChartProps) => {
    return (
        <ChartContainer height={height}>
            <RechartsAreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                {showGradient && (
                    <defs>
                        {categories.map((category, idx) => (
                            <linearGradient
                                key={`gradient-${category}`}
                                id={`gradient-${category}`}
                                x1="0" y1="0" x2="0" y2="1"
                            >
                                <stop offset="5%" stopColor={colors[idx % colors.length]} stopOpacity={0.1} />
                                <stop offset="95%" stopColor={colors[idx % colors.length]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                )}
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
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: 20 }}
                    />
                )}
                {categories.map((category, idx) => (
                    <Area
                        key={category}
                        type="monotone"
                        dataKey={category}
                        stroke={colors[idx % colors.length]}
                        fill={showGradient ? `url(#gradient-${category})` : colors[idx % colors.length]}
                        fillOpacity={showGradient ? 1 : 0.1}
                        strokeWidth={2}
                        dot={false}
                        activeDot={<ChartActiveDot />}
                    />
                ))}
            </RechartsAreaChart>
        </ChartContainer>
    );
};
