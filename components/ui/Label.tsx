"use client";

import type { ReactNode, Ref } from "react";
// import { HelpCircle } from "@untitledui/icons";
import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { Label as AriaLabel } from "react-aria-components";
// import { Tooltip, TooltipTrigger } from "./Tooltip";
import { cx } from "@/lib/utils";

interface LabelProps extends AriaLabelProps {
    children: ReactNode;
    isRequired?: boolean;
    tooltip?: string;
    tooltipDescription?: string;
    ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ isRequired, className, ...props }: LabelProps) => {
    return (
        <AriaLabel
            // Used for conditionally hiding/showing the label element via CSS:
            // <Input label="Visible only on mobile" className="lg:**:data-label:hidden" />
            // or
            // <Input label="Visible only on mobile" className="lg:label:hidden" />
            data-label="true"
            {...props}
            className={cx("flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary", className)}
        >
            {props.children}

            <span className={cx("hidden text-brand-tertiary", isRequired && "block", typeof isRequired === "undefined" && "group-required:block")}>*</span>

            {/* {tooltip && (
                <TooltipTrigger>
                    {tooltip}
                </TooltipTrigger>
            )} */}
        </AriaLabel>
    );
};

Label.displayName = "Label";
