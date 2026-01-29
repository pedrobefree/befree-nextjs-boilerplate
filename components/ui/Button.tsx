"use client";

import * as React from "react"
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
                secondary:
                    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm",
                tertiary:
                    "text-gray-600 hover:bg-gray-50 hover:text-gray-700",
                destructive:
                    "bg-error-600 text-white hover:bg-error-700 shadow-sm",
                "secondary-color":
                    "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-50"
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 py-2",
                lg: "h-11 px-5",
                xl: "h-12 px-6 text-base",
                "2xl": "h-14 px-7 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {
    iconLeading?: React.ElementType
    iconTrailing?: React.ElementType
}

/**
 * Button primitive using Untitled UI design tokens.
 * Supports leading/trailing icons and multiple variants/sizes.
 * 
 * @param {ButtonProps} props
 * @param {string} [props.variant] - Visual style: primary, secondary, tertiary, etc.
 * @param {string} [props.size] - Button size: sm, md, lg, xl, 2xl.
 * @param {React.ElementType} [props.iconLeading] - Icon to show before children.
 * @param {React.ElementType} [props.iconTrailing] - Icon to show after children.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, iconLeading: IconLeading, iconTrailing: IconTrailing, children, ...props }, ref) => {
        return (
            <AriaButton
                className={(values) => cn(buttonVariants({ variant, size, className }), typeof className === 'function' ? className(values) : className)}
                ref={ref}
                {...props}
            >
                {(values) => (
                    <>
                        {IconLeading && <IconLeading className={cn("size-4", children && "mr-2")} />}
                        {typeof children === 'function' ? children(values) : children}
                        {IconTrailing && <IconTrailing className={cn("size-4", children && "ml-2")} />}
                    </>
                )}
            </AriaButton>
        )
    }
)
Button.displayName = "Button"
