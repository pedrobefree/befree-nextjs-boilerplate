"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
    label?: string;
    helperText?: string;
    error?: boolean;
    prefix?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isDisabled?: boolean;
    containerClassName?: string;
}

/**
 * Input primitive with support for labels, helper text, errors, icons and prefixes.
 * 
 * @param {InputProps} props
 * @param {string} [props.label] - Input label.
 * @param {string} [props.helperText] - Text shown below the input.
 * @param {boolean} [props.error] - If true, applies error styling.
 * @param {React.ReactNode} [props.prefix] - Static prefix (e.g., http://).
 * @param {React.ReactNode} [props.leftIcon] - Icon shown inside the input on the left.
 * @param {React.ReactNode} [props.rightIcon] - Icon shown inside the input on the right.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, containerClassName, type, label, helperText, error, prefix, leftIcon, rightIcon, isDisabled, ...props }, ref) => {
        const id = React.useId();
        return (
            <div className="w-full space-y-1.5 text-left">
                {label && (
                    <label htmlFor={id} className="text-sm font-semibold text-gray-700 block">
                        {label}
                    </label>
                )}
                <div className={cn(
                    "flex items-center w-full rounded-lg border border-gray-300 bg-white transition-all shadow-xs",
                    "focus-within:ring-4 focus-within:ring-brand-600/10 focus-within:border-brand-600 focus-within:outline-hidden",
                    error && "border-error-300 focus-within:ring-error-600/10 focus-within:border-error-600",
                    isDisabled && "bg-gray-50 cursor-not-allowed opacity-70",
                    containerClassName
                )}>
                    {prefix && (
                        <div className="flex h-10 items-center px-3 border-r border-gray-200 bg-gray-50 text-gray-500 text-sm whitespace-nowrap rounded-l-lg">
                            {prefix}
                        </div>
                    )}
                    {leftIcon && (
                        <div className="pl-3 flex items-center justify-center text-gray-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        id={id}
                        type={type}
                        disabled={isDisabled}
                        className={cn(
                            "flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-hidden disabled:cursor-not-allowed border-none shadow-none focus:ring-0",
                            prefix && "rounded-l-none",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="pr-3 flex items-center justify-center text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {helperText && (
                    <p className={cn("text-xs text-gray-500", error && "text-error-600")}>{helperText}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"
