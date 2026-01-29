"use client";

import type { FC, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { Placement } from "@react-types/overlays";
import { BookOpen, ChevronsUpDown as ChevronSelectorVertical, LogOut, Plus, Settings, User as User01 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFocusManager } from "react-aria";
import { useAuth } from "@/components/features/auth/AuthProvider";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/features/AvatarLabelGroup";
import { Button } from "@/components/ui/Button";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/lib/utils";

// Re-using the logic from NavAccountCard but genericized

const RadioButtonBase = ({ isSelected, className }: { isSelected: boolean, className?: string }) => (
    <div className={cx("h-4 w-4 rounded-full border border-gray-300", isSelected && "bg-brand-600 border-brand-600", className)} />
);

export type UserAccount = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: "online" | "offline";
};

// Default placeholders if none provided (for testing/demo)

interface UserMenuDialogProps extends AriaDialogProps {
    className?: string;
    accounts?: UserAccount[];
    selectedAccountId?: string;
    onAccountSwitch?: (id: string) => void;
    _onClose?: () => void;
}

const UserMenuDialog = ({
    className,
    ...dialogProps
}: UserMenuDialogProps) => {
    const router = useRouter();
    const { signOut, user } = useAuth();
    const focusManager = useFocusManager();
    const dialogRef = useRef<HTMLDivElement>(null);

    const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
    const userEmail = user?.email || "user@example.com";
    const userAvatar = user?.user_metadata?.avatar_url || "";

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    focusManager?.focusNext({ tabbable: true, wrap: true });
                    break;
                case "ArrowUp":
                    focusManager?.focusPrevious({ tabbable: true, wrap: true });
                    break;
            }
        },
        [focusManager],
    );

    useEffect(() => {
        const element = dialogRef.current;
        if (element) {
            element.addEventListener("keydown", onKeyDown);
        }

        return () => {
            if (element) {
                element.removeEventListener("keydown", onKeyDown);
            }
        };
    }, [onKeyDown]);

    return (
        <AriaDialog
            {...dialogProps}
            ref={dialogRef}
            className={cx("w-66 rounded-xl bg-secondary_alt shadow-lg ring ring-secondary_alt outline-hidden", className)}
        >
            {({ close }) => (
                <div className="rounded-xl bg-primary ring-1 ring-secondary">
                    <div className="flex flex-col gap-0.5 py-1.5">
                        <UserMenuItem
                            label="View profile"
                            icon={User01}
                            shortcut="⌘K->P"
                            onClick={() => {
                                router.push("/settings");
                                close();
                            }}
                        />
                        <UserMenuItem
                            label="Account settings"
                            icon={Settings}
                            shortcut="⌘S"
                            onClick={() => {
                                router.push("/settings");
                                close();
                            }}
                        />
                        <UserMenuItem
                            label="Documentation"
                            icon={BookOpen}
                            onClick={() => {
                                router.push("/support");
                                close();
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 border-t border-secondary py-1.5">
                        <div className="px-3 pt-1.5 pb-1 text-xs font-semibold text-tertiary">Current Workspace</div>

                        <div className="flex flex-col gap-0.5 px-1.5">
                            <div
                                className={cx(
                                    "relative w-full rounded-md px-2 py-1.5 text-left bg-primary_hover",
                                )}
                            >
                                <AvatarLabelGroup status="online" size="md" src={userAvatar} title={userName} subtitle={userEmail} />

                                <RadioButtonBase isSelected={true} className="absolute top-2 right-2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 px-2 pt-0.5 pb-2 border-t border-secondary mt-1">
                        <Button variant="secondary" size="sm" className="w-full justify-start gap-2" onPress={close}>
                            <Plus className="size-4" /> Add workspace
                        </Button>
                    </div>

                    <div className="pt-1 pb-1.5 border-t border-secondary">
                        <UserMenuItem
                            label="Sign out"
                            icon={LogOut}
                            shortcut="⌥⇧Q"
                            onClick={async () => {
                                await signOut();
                                close();
                            }}
                        />
                    </div>
                </div>
            )}
        </AriaDialog>
    );
};

const UserMenuItem = ({
    icon: Icon,
    label,
    shortcut,
    ...buttonProps
}: {
    icon?: FC<{ className?: string }>;
    label: string;
    shortcut?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...buttonProps} className={cx("group/item w-full cursor-pointer px-1.5 focus:outline-hidden", buttonProps.className)}>
            <div
                className={cx(
                    "flex w-full items-center justify-between gap-3 rounded-md p-2 group-hover/item:bg-primary_hover",
                    "outline-focus-ring group-focus-visible/item:outline-2 group-focus-visible/item:outline-offset-2",
                )}
            >
                <div className="flex gap-2 text-sm font-semibold text-secondary group-hover/item:text-secondary_hover">
                    {Icon && <Icon className="size-5 text-fg-quaternary" />} {label}
                </div>

                {shortcut && (
                    <kbd className="flex rounded px-1 py-px font-body text-xs font-medium text-tertiary ring-1 ring-secondary ring-inset">{shortcut}</kbd>
                )}
            </div>
        </button>
    );
};

export interface UserMenuProps {
    name?: string;
    email?: string;
    avatarUrl?: string;
    placement?: Placement;
    accounts?: UserAccount[];
    selectedAccountId?: string;
}

export const UserMenu = ({
    placement,
}: UserMenuProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpoint();
    const { user } = useAuth();

    // Prefer User Metadata name, then email, then display fallback
    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
    const userEmail = user?.email || "user@example.com";
    const userAvatar = user?.user_metadata?.avatar_url || "";

    const displayAccount = {
        name: userName,
        email: userEmail,
        avatar: userAvatar,
        status: "online",
        id: user?.id || "custom"
    };

    return (
        <div ref={triggerRef} className="relative flex w-full items-center gap-3 rounded-xl p-2 ring-1 ring-secondary ring-inset hover:bg-gray-50/50 transition-colors">
            <AvatarLabelGroup
                size="md"
                src={displayAccount.avatar}
                title={displayAccount.name}
                subtitle={displayAccount.email}
                status={displayAccount.status as any}
            />

            <div className="absolute top-1.5 right-1.5">
                <AriaDialogTrigger>
                    <AriaButton className="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:text-fg-quaternary_hover">
                        <ChevronSelectorVertical className="size-4 shrink-0" />
                    </AriaButton>
                    <AriaPopover
                        placement={placement ?? (isDesktop ? "right bottom" : "top right")}
                        triggerRef={triggerRef}
                        offset={8}
                        className={({ isEntering, isExiting }) =>
                            cx(
                                "origin-(--trigger-anchor-point) will-change-transform z-50",
                                isEntering &&
                                "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                                isExiting &&
                                "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                            )
                        }
                    >
                        <UserMenuDialog />
                    </AriaPopover>
                </AriaDialogTrigger>
            </div>
        </div>
    );
};
