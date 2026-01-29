"use client";

import type { ReactNode } from "react";
import type { DialogProps, ModalOverlayProps } from "react-aria-components";
import {
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    Heading,
} from "react-aria-components";
import { CloseButton } from "@/components/ui/CloseButton";
import { cx } from "@/lib/utils";

// ============================================
// Slideout Menu Components
// ============================================

const DialogTrigger = AriaDialogTrigger;

const ModalOverlay = ({ className, isDismissable = true, ...props }: ModalOverlayProps) => (
    <AriaModalOverlay
        isDismissable={isDismissable}
        className={(state) =>
            cx(
                "fixed inset-0 z-50 flex justify-end bg-overlay/70 backdrop-blur-[4px]",
                // Animation
                state.isEntering && "duration-300 ease-out animate-in fade-in",
                state.isExiting && "duration-500 ease-in animate-out fade-out",
                typeof className === "function" ? className(state) : className,
            )
        }
        {...props}
    />
);

const Modal = ({ className, ...props }: ModalOverlayProps) => (
    <AriaModal
        className={(state) =>
            cx(
                "z-50 m-2 flex w-full max-w-[calc(100vw-16px)] flex-col rounded-xl bg-primary shadow-xl outline-hidden overflow-hidden sm:max-w-md",
                // Animation
                state.isEntering && "duration-300 ease-out animate-in fade-in slide-in-from-right",
                state.isExiting && "duration-500 ease-in animate-out slide-out-to-right",
                typeof className === "function" ? className(state) : className,
            )
        }
        {...props}
    />
);

const Dialog = ({ className, ...props }: DialogProps) => (
    <AriaDialog className={cx("flex h-full flex-col outline-hidden", className)} {...props} />
);

const Header = ({
    children,
    className,
    onClose,
}: {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}) => (
    <div className={cx("flex flex-none items-start justify-between border-b border-secondary px-6 py-5", className)}>
        <div className="flex flex-col gap-1 pr-4">{children}</div>
        {onClose && (
            <div className="-mr-2 -mt-2">
                <CloseButton onPress={onClose} aria-label="Close" />
            </div>
        )}
    </div>
);

const Content = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx("flex-1 overflow-y-auto p-6", className)}>{children}</div>
);

const Footer = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx("flex flex-none flex-col gap-3 border-t border-secondary p-4 sm:flex-row sm:justify-between sm:p-6", className)}>
        {children}
    </div>
);

const Title = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading slot="title" className={cx("text-lg font-semibold text-primary", className)} {...props} />
);

const Description = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cx("text-sm text-tertiary", className)} {...props} />
);

// ============================================
// Compound Component Export
// ============================================

const SlideoutMenuComponent = () => null;

export const SlideoutMenu = Object.assign(SlideoutMenuComponent, {
    Trigger: DialogTrigger,
    Overlay: ModalOverlay,
    Modal: Modal,
    Dialog: Dialog,
    Header: Header,
    Content: Content,
    Footer: Footer,
    Title: Title,
    Description: Description,
});
