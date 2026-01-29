"use client";

import { type FC, type PropsWithChildren, type ReactNode, type RefAttributes, isValidElement, useContext, type ElementType } from "react";
import {
    ToggleButton as AriaToggleButton,
    ToggleButtonGroup as AriaToggleButtonGroup,
    type ToggleButtonGroupProps,
    type ToggleButtonProps,
} from "react-aria-components";
import { cx, sortCx } from "@/lib/utils";
import { isReactComponent } from "@/lib/utils";
import { ButtonGroupContext } from "./ButtonGroup.context";

const styles = sortCx({
    common: {
        root: [
            "group/button-group relative -ml-px inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary ring-1 ring-inset ring-border-secondary shadow-xs outline-brand transition duration-100 ease-linear first:ml-0",
            // Hover and focus styles
            "hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled",
            // Selected styles
            "selected:z-10 selected:bg-active selected:text-secondary_hover selected:ring-1 selected:ring-brand",
        ].join(" "),
        icon: "pointer-events-none text-fg-quaternary transition-[inherit] group-hover/button-group:text-fg-quaternary_hover group-disabled/button-group:text-fg-disabled_subtle",
    },

    sizes: {
        sm: {
            root: "gap-1 px-3 py-1.5 text-sm first:rounded-l-lg last:rounded-r-lg data-icon-only:p-1.5",
            icon: "size-4",
        },
        md: {
            root: "gap-1.5 px-3.5 py-2.5 text-sm first:rounded-l-lg last:rounded-r-lg data-icon-only:p-2",
            icon: "size-5",
        },
        lg: {
            root: "gap-2 px-4.5 py-2.5 text-md first:rounded-l-lg last:rounded-r-lg data-icon-only:p-3",
            icon: "size-5",
        },
    },
});

type ButtonSize = "sm" | "md" | "lg";

interface ButtonGroupItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
    iconLeading?: FC<{ className?: string }> | ReactNode;
    iconTrailing?: FC<{ className?: string }> | ReactNode;
    onClick?: () => void;
}

export const ButtonGroupItem = ({
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    children,
    className,
    ...otherProps
}: PropsWithChildren<ButtonGroupItemProps>) => {
    const context = useContext(ButtonGroupContext);

    if (!context) {
        throw new Error("ButtonGroupItem must be used within a ButtonGroup component");
    }

    const { size } = context;

    const isIcon = (IconLeading || IconTrailing) && !children;

    return (
        <AriaToggleButton
            {...otherProps}
            data-icon-only={isIcon ? true : undefined}
            data-icon-leading={IconLeading ? true : undefined}
            className={(state) => cx(
                styles.common.root,
                styles.sizes[size].root,
                typeof className === "function" ? className(state) : className
            )}
        >
            {isReactComponent(IconLeading) ? (
                (() => {
                    const CustomIcon = IconLeading as ElementType;
                    return <CustomIcon className={cx(styles.common.icon, styles.sizes[size].icon)} />;
                })()
            ) : (
                isValidElement(IconLeading) && IconLeading
            )}

            {children}

            {isReactComponent(IconTrailing) ? (
                (() => {
                    const CustomIcon = IconTrailing as ElementType;
                    return <CustomIcon className={cx(styles.common.icon, styles.sizes[size].icon)} />;
                })()
            ) : (
                isValidElement(IconTrailing) && IconTrailing
            )}
        </AriaToggleButton>
    );
};

interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, "orientation">, RefAttributes<HTMLDivElement> {
    size?: ButtonSize;
    className?: string;
}

export const ButtonGroup = ({ children, size = "md", className, ...otherProps }: ButtonGroupProps) => {
    return (
        <ButtonGroupContext.Provider value={{ size }}>
            <AriaToggleButtonGroup
                selectionMode="single"
                className={cx("relative z-0 inline-flex w-max rounded-lg shadow-xs", className)}
                {...otherProps}
            >
                {children}
            </AriaToggleButtonGroup>
        </ButtonGroupContext.Provider>
    );
};
