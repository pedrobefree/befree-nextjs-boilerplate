"use client";

import { Bell, Shield, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cx } from "@/lib/utils";

// Using the same mock data or similar
const mockNotifications = [
    {
        id: "1",
        title: "New team member joined",
        description: "Demi Wilkinson joined the UI Redesign project.",
        time: "2m ago",
        type: "team",
        isRead: false,
        sender: { name: "Demi Wilkinson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" }
    },
    {
        id: "2",
        title: "Security Alert",
        description: "New login detected from Chrome on MacOS.",
        time: "1h ago",
        type: "system",
        isRead: false
    },
];

export const NotificationPopover = () => {
    const router = useRouter();
    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    return (
        <AriaDialogTrigger>
            <AriaButton className="relative flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 outline-hidden focus-visible:ring-2 focus-visible:ring-brand-600">
                <Bell className="size-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600 border-2 border-white"></span>
                    </span>
                )}
            </AriaButton>
            <AriaPopover
                placement="bottom end"
                offset={8}
                className={({ isEntering, isExiting }) =>
                    cx(
                        "z-50 w-80 sm:w-96 rounded-xl bg-white shadow-xl ring-1 ring-gray-200 outline-hidden",
                        isEntering && "animate-in fade-in zoom-in-95 duration-150 ease-out",
                        isExiting && "animate-out fade-out zoom-out-95 duration-100 ease-in"
                    )
                }
            >
                <AriaDialog className="outline-hidden">
                    {({ close }) => (
                        <div className="flex flex-col max-h-[500px]">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <button className="text-xs font-bold text-brand-700 hover:text-brand-800">Mark all as read</button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {mockNotifications.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {mockNotifications.map((n) => (
                                            <div key={n.id} className={cx("p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer", !n.isRead && "bg-brand-25/50")}>
                                                <div className="shrink-0">
                                                    {n.sender ? (
                                                        <Avatar src={n.sender.avatar} size="sm" />
                                                    ) : (
                                                        <div className={cx("size-8 rounded-full flex items-center justify-center", n.type === "system" ? "bg-error-50 text-error-600" : "bg-brand-50 text-brand-600")}>
                                                            {n.type === "system" ? <Shield className="size-4" /> : <Info className="size-4" />}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="text-sm font-bold text-gray-900 truncate">{n.title}</p>
                                                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{n.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{n.description}</p>
                                                </div>
                                                {!n.isRead && (
                                                    <div className="shrink-0 self-center">
                                                        <div className="size-2 rounded-full bg-brand-600"></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <Bell className="size-8 text-gray-300 mx-auto mb-3" />
                                        <p className="text-sm text-gray-500">No new notifications</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t border-gray-100">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                    onPress={() => {
                                        router.push("/notifications");
                                        close();
                                    }}
                                >
                                    View all activity
                                </Button>
                            </div>
                        </div>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};
