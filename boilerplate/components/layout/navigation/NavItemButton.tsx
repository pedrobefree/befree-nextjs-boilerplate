
import * as React from "react"
import { Tooltip } from "@/components/ui/Tooltip"
import { cx } from "@/lib/utils"

const styles = {
    md: {
        root: "size-10",
        icon: "size-5",
    },
    lg: {
        root: "size-12",
        icon: "size-6",
    },
};

interface NavItemButtonProps {
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the button is clicked. */
    href?: string;
    /** Label text for the button. */
    label: string;
    /** Icon component to display. */
    icon: React.FC<{ className?: string }>;
    /** Whether the button is currently active. */
    current?: boolean;
    /** Size of the button. */
    size?: "md" | "lg";
    /** Handler for click events. */
    onClick?: React.MouseEventHandler;
    /** Additional CSS classes to apply to the button. */
    className?: string;
    /** Placement of the tooltip. */
    tooltipPlacement?: "top" | "right" | "bottom" | "left";
    children?: React.ReactNode;
}

export const NavItemButton = ({
    current,
    label,
    href,
    icon: Icon,
    size = "md",
    className,
    tooltipPlacement = "right",
    onClick,
    children
}: NavItemButtonProps) => {
    // If children are provided, render as a button with icon and label (sidebar expanded style)
    if (children) {
        return (
            <a
                href={href}
                onClick={onClick}
                className={cx(
                    "group flex w-full items-center rounded-md px-3 py-2 text-md font-semibold bg-primary text-secondary hover:bg-primary_hover hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring transition duration-100 ease-linear cursor-pointer",
                    current && "bg-active text-fg-quaternary_hover hover:bg-secondary_hover",
                    className
                )}
            >
                {Icon && <Icon className="mr-3 size-5 shrink-0 text-fg-quaternary transition-inherit-all" />}
                {children}
            </a>
        );
    }

    // Otherwise render as icon-only button with tooltip (sidebar collapsed style)
    return (
        <Tooltip title={label} placement={tooltipPlacement}>
            <a
                href={href}
                aria-label={label}
                onClick={onClick}
                className={cx(
                    "relative flex w-full cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                    current && "bg-active text-fg-quaternary_hover hover:bg-secondary_hover",
                    styles[size].root,
                    className,
                )}
            >
                <Icon aria-hidden="true" className={cx("shrink-0 transition-inherit-all", styles[size].icon)} />
            </a>
        </Tooltip>
    );
};
