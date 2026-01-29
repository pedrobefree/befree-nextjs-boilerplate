"use client";

import {
    DateInput as AriaDateInput,
    DateSegment as AriaDateSegment,
    type DateInputProps as AriaDateInputProps,
} from "react-aria-components";
import { cx } from "@/lib/utils";

interface DateInputProps extends AriaDateInputProps {
    className?: string;
}

export const DateInput = ({ className, ...props }: DateInputProps) => {
    return (
        <AriaDateInput
            className={(state) => cx(
                "flex h-10 w-full items-center rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-primary shadow-xs transition-colors",
                state.isFocusWithin && "border-brand ring-4 ring-brand-secondary/20",
                className
            )}
            {...props}
        >
            {(segment) => (
                <AriaDateSegment
                    segment={segment}
                    className={({ isPlaceholder, isFocused }) => cx(
                        "rounded-xs px-0.5 outline-none transition-colors",
                        isFocused && "bg-brand text-white",
                        isPlaceholder && "text-placeholder_subtle"
                    )}
                />
            )}
        </AriaDateInput>
    );
};
