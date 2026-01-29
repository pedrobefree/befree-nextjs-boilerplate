"use client";

import { AreaChart } from "../charts/AreaChart";

const data = [
    { month: "Jan", target: 4500, actual: 4200 },
    { month: "Feb", target: 5200, actual: 5100 },
    { month: "Mar", target: 5800, actual: 6100 },
    { month: "Apr", target: 6100, actual: 5900 },
    { month: "May", target: 6500, actual: 7200 },
    { month: "Jun", target: 7200, actual: 8100 },
];

export const RevenueChart = () => {
    return (
        <AreaChart
            data={data}
            index="month"
            categories={["target", "actual"]}
            valueFormatter={(v) => `$${v}`}
        />
    );
};
