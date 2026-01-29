"use client";

import type { ReactNode } from "react";
import { X as CloseIcon, Menu as Menu02 } from "lucide-react";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
// import { UntitledLogo } from "@/components@/components/ui/logo/untitledui-logo";
const UntitledLogo = () => <div className="font-bold text-xl">Untitled UI</div>;

import { cx } from "@/lib/utils";

interface MobileNavigationHeaderProps {
    children: (close: () => void) => ReactNode;
}

export const MobileNavigationHeader = ({ children }: MobileNavigationHeaderProps) => {
    return (
        <AriaDialogTrigger>
            <AriaButton
                aria-label="Expand navigation menu"
                className="group flex items-center justify-center rounded-lg bg-primary p-2 text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
            >
                <Menu02 className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
                <CloseIcon className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
            </AriaButton>

            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    cx(
                        "fixed inset-0 z-50 bg-overlay/60 backdrop-blur-sm lg:hidden",
                        isEntering && "duration-300 ease-out animate-in fade-in",
                        isExiting && "duration-200 ease-in animate-out fade-out",
                    )
                }
            >
                <AriaModal
                    className={({ isEntering, isExiting }) =>
                        cx(
                            "fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl ring-1 ring-black/5 outline-none will-change-transform",
                            isEntering && "duration-300 ease-out animate-in slide-in-from-left",
                            isExiting && "duration-200 ease-in animate-out slide-out-to-left",
                        )
                    }
                >
                    <AriaDialog className="h-full flex flex-col outline-none">
                        {({ close }) => (
                            <>
                                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                    <UntitledLogo />
                                    <AriaButton
                                        aria-label="Close navigation menu"
                                        onPress={close}
                                        className="flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        <CloseIcon className="size-5" />
                                    </AriaButton>
                                </div>
                                <div className="flex-1 overflow-y-auto bg-white">
                                    {children(close)}
                                </div>
                            </>
                        )}
                    </AriaDialog>
                </AriaModal>
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
};
