import { X as CloseIcon } from "lucide-react";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { cx } from "@/lib/utils";

interface FilterSheetProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
}

export const FilterSheet = ({ children, trigger }: FilterSheetProps) => {
    return (
        <AriaDialogTrigger>
            {trigger}

            <AriaModalOverlay
                isDismissable
                className={({ isEntering, isExiting }) =>
                    cx(
                        "fixed inset-0 z-50 bg-overlay/60 backdrop-blur-sm",
                        isEntering && "duration-300 ease-out animate-in fade-in",
                        isExiting && "duration-200 ease-in animate-out fade-out",
                    )
                }
            >
                <AriaModal
                    className={({ isEntering, isExiting }) =>
                        cx(
                            "fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl ring-1 ring-black/5 outline-none will-change-transform",
                            isEntering && "duration-300 ease-out animate-in slide-in-from-right",
                            isExiting && "duration-200 ease-in animate-out slide-out-to-right",
                        )
                    }
                >
                    <AriaDialog className="h-full flex flex-col outline-none">
                        {({ close }) => (
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                    <AriaButton
                                        aria-label="Close filters"
                                        onPress={close}
                                        className="flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        <CloseIcon className="size-5" />
                                    </AriaButton>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6">
                                    {children}
                                </div>
                                <div className="p-6 border-t border-gray-100 flex gap-3">
                                    <AriaButton
                                        onPress={close}
                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Clear All
                                    </AriaButton>
                                    <AriaButton
                                        onPress={close}
                                        className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
                                    >
                                        Apply Filters
                                    </AriaButton>
                                </div>
                            </>
                        )}
                    </AriaDialog>
                </AriaModal>
            </AriaModalOverlay>
        </AriaDialogTrigger>
    );
};
