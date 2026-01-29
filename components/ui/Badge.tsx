import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-gray-50 text-gray-700 ring-gray-200",
                brand:
                    "bg-brand-50 text-brand-700 ring-brand-200",
                success:
                    "bg-success-50 text-success-700 ring-success-200",
                error:
                    "bg-error-50 text-error-700 ring-error-200",
                warning:
                    "bg-warning-50 text-warning-700 ring-warning-200",
            },
            size: {
                sm: "px-2 py-0.5 text-[12px]",
                md: "px-2.5 py-0.5 text-[13px]",
                lg: "px-3 py-1 text-sm"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "sm",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
    )
}

export { Badge }
