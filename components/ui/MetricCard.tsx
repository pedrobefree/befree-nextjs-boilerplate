import * as React from "react"
import { Card, CardContent } from "./Card"
import { Badge } from "./Badge"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    value: string | number
    trend?: {
        value: string
        direction: "up" | "down" | "neutral"
        label?: string
    }
    icon?: React.ReactNode
    action?: React.ReactNode
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
    ({ className, title, value, trend, icon, action, ...props }, ref) => {
        return (
            <Card ref={ref} className={cn("", className)} {...props}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        {action}
                        {icon && !action && <div className="text-gray-400">{icon}</div>}
                    </div>

                    <div className="mt-4">
                        <h3 className="text-4xl font-semibold text-gray-900 tracking-tight">{value}</h3>
                    </div>

                    {trend && (
                        <div className="mt-4 flex items-center gap-2">
                            <Badge
                                variant={trend.direction === "up" ? "success" : trend.direction === "down" ? "error" : "default"}
                                className="rounded-full px-2.5 py-0.5"
                            >
                                <span className="sr-only">{trend.direction}</span>
                                {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "•"} {trend.value}
                            </Badge>
                            {trend.label && <span className="text-sm font-medium text-gray-500">{trend.label}</span>}
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }
