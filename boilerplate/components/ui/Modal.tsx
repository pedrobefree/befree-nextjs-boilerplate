"use client";

import { X as XCloseIcon } from "lucide-react";
import type {
    ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    DialogTrigger as AriaDialogTrigger,
} from "react-aria-components";
import { cx } from "@/lib/utils";

export const DialogTrigger = AriaDialogTrigger;

interface ModalOverlayProps extends AriaModalOverlayProps {
    onClose?: () => void;
}

export const ModalOverlay = (props: ModalOverlayProps) => {
    // Destructure onClose from props
    const { onClose, ...restProps } = props;

    return (
        <AriaModalOverlay
            {...restProps}
            className={(state) =>
                cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-overlay/70 px-4 pt-4 pb-[clamp(16px,8vh,64px)] outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:p-8",
                    state.isEntering && "duration-300 ease-out animate-in fade-in",
                    state.isExiting && "duration-200 ease-in animate-out fade-out",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        >
            {(state) => (
                <>
                    {/* The close button */}
                    {onClose && (
                        <div className="absolute right-4 top-4 z-50">
                            <AriaButton
                                onPress={onClose}
                                className="rounded-lg p-2 text-fg-quaternary transition-colors hover:bg-bg-primary_hover hover:text-fg-quaternary_hover focus:outline-hidden focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                            >
                                <XCloseIcon className="size-6" />
                            </AriaButton>
                        </div>
                    )}
                    {typeof props.children === "function" ? props.children(state) : props.children}
                </>
            )}
        </AriaModalOverlay>
    );
};

export const Modal = (props: AriaModalOverlayProps) => {
    return (
        <AriaModal
            {...props}
            className={(state) =>
                cx(
                    "max-h-full w-full align-middle outline-hidden max-sm:overflow-y-auto max-sm:rounded-xl bg-primary shadow-xl rounded-xl border border-secondary sm:max-w-lg",
                    state.isEntering && "duration-300 ease-out animate-in zoom-in-95",
                    state.isExiting && "duration-200 ease-in animate-out zoom-out-95",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        >
            {props.children}
        </AriaModal>
    );
};

export const Dialog = AriaDialog;
