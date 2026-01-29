"use client";

import { createContext, type HTMLAttributes, type ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { FeaturedIcon } from "@/components/ui/FeaturedIcon";

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

interface RootContextValue {
    size: "sm" | "md" | "lg";
}

const RootContext = createContext<RootContextValue>({
    size: "lg",
});

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const styles = {
    // Root styles
    root: {
        base: "flex flex-col items-center justify-center text-center",
        lg: "gap-8 max-w-[480px]",
        md: "gap-6 max-w-[352px]",
        sm: "gap-4 max-w-[280px]",
    },
    // Header section (Icon/Image/etc)
    header: {
        base: "flex flex-col items-center justify-center",
        lg: "gap-6",
        md: "gap-5",
        sm: "gap-4",
    },
    // Content section (Title + Description)
    content: {
        base: "flex flex-col items-center justify-center text-center",
        lg: "gap-2",
        md: "gap-1",
        sm: "gap-1",
    },
    title: {
        base: "font-semibold text-primary",
        lg: "text-display-xs",
        md: "text-lg",
        sm: "text-md",
    },
    description: {
        base: "text-tertiary",
        lg: "text-md",
        md: "text-sm",
        sm: "text-sm",
    },
    footer: {
        base: "flex w-full items-center justify-center gap-3",
        lg: "mt-2",
        md: "",
        sm: "",
    },
};

/* -------------------------------------------------------------------------- */
/*                                Components                                  */
/* -------------------------------------------------------------------------- */

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

const Root = ({ size = "lg", className, children, ...props }: EmptyStateProps) => {
    return (
        <RootContext.Provider value={{ size }}>
            <div
                className={cx(styles.root.base, styles.root[size], className)}
                {...props}
            >
                {children}
            </div>
        </RootContext.Provider>
    );
};

const Header = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { size } = useContext(RootContext);
    return (
        <div className={cx(styles.header.base, styles.header[size], className)} {...props}>
            {children}
        </div>
    );
};

const Content = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { size } = useContext(RootContext);
    return (
        <div className={cx(styles.content.base, styles.content[size], className)} {...props}>
            {children}
        </div>
    );
};

const Footer = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { size } = useContext(RootContext);
    return (
        <div className={cx(styles.footer.base, styles.footer[size], className)} {...props}>
            {children}
        </div>
    );
};

const Title = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const { size } = useContext(RootContext);
    return (
        <h3 className={cx(styles.title.base, styles.title[size], className)} {...props}>
            {children}
        </h3>
    );
};

const Description = ({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    const { size } = useContext(RootContext);
    return (
        <p className={cx(styles.description.base, styles.description[size], className)} {...props}>
            {children}
        </p>
    );
};

/**
 * A wrapper for the FeaturedIcon to be used within the EmptyState.Header.
 * It's just a pass-through to FeaturedIcon but ensures semantic usage.
 */
const Icon = FeaturedIcon;

export const EmptyState = Object.assign(Root, {
    Header,
    Content,
    Footer,
    Title,
    Description,
    Icon,
});
