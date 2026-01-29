"use client";

import { X } from "lucide-react";
import type { ButtonProps } from "react-aria-components";
import { Button } from "react-aria-components";
import { cx } from "@/lib/utils";

interface CloseButtonProps extends ButtonProps {
    size?: "sm" | "md" | "lg";
}

const sizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
};

export const CloseButton = ({ size = "md", className, ...props }: CloseButtonProps) => {
    return (
        <Button
            {...props}
            className={(state) =>
                cx(
                    "flex shrink-0 items-center justify-center rounded-lg text-fg-quaternary transition-colors duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus:bg-primary_hover outline-focus-ring",
                    sizes[size],
                    state.isDisabled && "cursor-not-allowed opacity-50",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            <X className={cx(size === "sm" && "size-4", size === "md" && "size-5", size === "lg" && "size-6")} />
        </Button>
    );
};
