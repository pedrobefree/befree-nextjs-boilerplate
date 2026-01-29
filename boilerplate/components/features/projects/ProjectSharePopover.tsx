"use client";

import { Copy, Mail, Globe, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Popover as AriaPopover, Dialog as AriaDialog } from "react-aria-components";
import { cx } from "@/lib/utils";

interface ProjectSharePopoverProps {
    triggerRef: React.RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ProjectSharePopover = ({ triggerRef, isOpen, onOpenChange }: ProjectSharePopoverProps) => {
    const [copied, setCopied] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AriaPopover
            triggerRef={triggerRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="bottom end"
            offset={8}
            className={({ isEntering, isExiting }) =>
                cx(
                    "z-50 w-72 origin-(--trigger-anchor-point) rounded-xl bg-white shadow-2xl ring-1 ring-black/5 outline-none will-change-transform",
                    isEntering && "duration-150 ease-out animate-in fade-in zoom-in-95",
                    isExiting && "duration-100 ease-in animate-out fade-out zoom-out-95"
                )
            }
        >
            <AriaDialog className="outline-none">
                <div className="p-4 space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold text-gray-900">Share Project</h3>
                        <p className="text-xs text-gray-500">Collaborate with your team or share publicly.</p>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center gap-2">
                                <Copy className="size-4 text-gray-400 group-hover:text-brand-600" />
                                <span className="text-sm font-medium text-gray-700">Copy link</span>
                            </div>
                            {copied ? (
                                <div className="flex items-center gap-1 text-success-600">
                                    <Check className="size-4" />
                                    <span className="text-xs font-bold">Copied!</span>
                                </div>
                            ) : (
                                <span className="text-xs text-tertiary">⌘C</span>
                            )}
                        </button>

                        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group text-left">
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 text-gray-400 group-hover:text-brand-600" />
                                <span className="text-sm font-medium text-gray-700">Invite via email</span>
                            </div>
                        </button>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="size-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">Public access</span>
                            </div>
                            <button
                                onClick={() => setIsPublic(!isPublic)}
                                className={cx(
                                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                                    isPublic ? "bg-brand-600" : "bg-gray-200"
                                )}
                            >
                                <span
                                    className={cx(
                                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                        isPublic ? "translate-x-4" : "translate-x-0"
                                    )}
                                />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400">Anyone with the link can view this project.</p>
                    </div>

                    <Button size="sm" className="w-full mt-2">
                        Done
                    </Button>
                </div>
            </AriaDialog>
        </AriaPopover>
    );
};
