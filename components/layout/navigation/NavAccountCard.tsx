"use client";

import type { FC, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { Placement } from "@react-types/overlays";
import { BookOpen, ChevronsUpDown as ChevronSelectorVertical, LogOut, Plus, Settings, User as User01 } from "lucide-react";
const LogOut01 = LogOut; const Settings01 = Settings; const BookOpen01 = BookOpen;

import { useFocusManager } from "react-aria";
import type { DialogProps as AriaDialogProps } from "react-aria-components";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/features/AvatarLabelGroup";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/features/auth/AuthProvider";
const RadioButtonBase = ({ isSelected, className }: { isSelected: boolean, className?: string }) => (
    <div className={cx("h-4 w-4 rounded-full border border-gray-300", isSelected && "bg-brand-600 border-brand-600", className)} />
);

import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/lib/utils";

type NavAccountType = {
    /** Unique identifier for the nav item. */
    id: string;
    /** Name of the account holder. */
    name: string;
    /** Email address of the account holder. */
    email: string;
    /** Avatar image URL. */
    avatar: string;
    /** Online status of the account holder. This is used to display the online status indicator. */
    status: "online" | "offline";
};

const placeholderAccounts: NavAccountType[] = [
    {
        id: "olivia",
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        status: "online",
    },
    {
        id: "sienna",
        name: "Sienna Hewitt",
        email: "sienna@untitledui.com",
        avatar: "https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E0E0E0",
        status: "online",
    },
];

export const NavAccountMenu = ({
    className,
    selectedAccountId = "olivia",
    ...dialogProps
}: AriaDialogProps & { className?: string; accounts?: NavAccountType[]; selectedAccountId?: string }) => {
    const router = useRouter();
    const { signOut } = useAuth();
    const focusManager = useFocusManager();
    const dialogRef = useRef<HTMLDivElement>(null);

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
                        <NavAccountCardMenuItem
                            label="View profile"
                            icon={User01}
                            shortcut="⌘K->P"
                            onClick={() => {
                                router.push("/settings");
                                close();
                            }}
                        />
                        <NavAccountCardMenuItem
                            label="Account settings"
                            icon={Settings01}
                            shortcut="⌘S"
                            onClick={() => {
                                router.push("/settings");
                                close();
                            }}
                        />
                        <NavAccountCardMenuItem
                            label="Documentation"
                            icon={BookOpen01}
                            onClick={() => {
                                router.push("/support");
                                close();
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-0.5 border-t border-secondary py-1.5">
                        <div className="px-3 pt-1.5 pb-1 text-xs font-semibold text-tertiary">Switch account</div>

                        <div className="flex flex-col gap-0.5 px-1.5">
                            {placeholderAccounts.map((account) => (
                                <button
                                    key={account.id}
                                    className={cx(
                                        "relative w-full cursor-pointer rounded-md px-2 py-1.5 text-left outline-focus-ring hover:bg-primary_hover focus:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                                        account.id === selectedAccountId && "bg-primary_hover",
                                    )}
                                    onClick={close}
                                >
                                    <AvatarLabelGroup status="online" size="md" src={account.avatar} title={account.name} subtitle={account.email} />

                                    <RadioButtonBase isSelected={account.id === selectedAccountId} className="absolute top-2 right-2" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 px-2 pt-0.5 pb-2">
                        <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                            <Plus className="size-4" /> Add account
                        </Button>
                    </div>

                    <div className="border-t border-secondary pt-1 pb-1.5">
                        <NavAccountCardMenuItem
                            label="Sign out"
                            icon={LogOut01}
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

const NavAccountCardMenuItem = ({
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
                    // Focus styles.
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

export const NavAccountCard = ({
    popoverPlacement,
    selectedAccountId = "olivia",
    items = placeholderAccounts,
}: {
    popoverPlacement?: Placement;
    selectedAccountId?: string;
    items?: NavAccountType[];
}) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpoint();

    const selectedAccount = placeholderAccounts.find((account) => account.id === selectedAccountId);

    if (!selectedAccount) {
        console.warn(`Account with ID ${selectedAccountId} not found in <NavAccountCard />`);
        return null;
    }

    return (
        <div ref={triggerRef} className="relative flex items-center gap-3 rounded-xl p-3 ring-1 ring-secondary ring-inset">
            <AvatarLabelGroup
                size="md"
                src={selectedAccount.avatar}
                title={selectedAccount.name}
                subtitle={selectedAccount.email}
                status={selectedAccount.status}
            />

            <div className="absolute top-1.5 right-1.5">
                <AriaDialogTrigger>
                    <AriaButton className="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:text-fg-quaternary_hover">
                        <ChevronSelectorVertical className="size-4 shrink-0" />
                    </AriaButton>
                    <AriaPopover
                        placement={popoverPlacement ?? (isDesktop ? "right bottom" : "top right")}
                        triggerRef={triggerRef}
                        offset={8}
                        className={({ isEntering, isExiting }) =>
                            cx(
                                "origin-(--trigger-anchor-point) will-change-transform",
                                isEntering &&
                                "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
                                isExiting &&
                                "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
                            )
                        }
                    >
                        <NavAccountMenu
                            selectedAccountId={selectedAccountId}
                            accounts={items}
                        />
                    </AriaPopover>
                </AriaDialogTrigger>
            </div>
        </div>
    );
};
