"use client";

import { useState } from "react";
import { Bell, Check, Trash2, Shield, Users, CreditCard, Info, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import { cx } from "@/lib/utils";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "system" | "team" | "billing";
    isRead: boolean;
    sender?: {
        name: string;
        avatar: string;
    };
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "New team member joined",
        description: "Demi Wilkinson has joined the UI Redesign project.",
        time: "2 mins ago",
        type: "team",
        isRead: false,
        sender: { name: "Demi Wilkinson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" }
    },
    {
        id: "2",
        title: "Security Alert",
        description: "A new login was detected from a Chrome browser on a MacOS device.",
        time: "1 hour ago",
        type: "system",
        isRead: false
    },
    {
        id: "3",
        title: "Subscription Renewal",
        description: "Your Pro plan will automatically renew on Feb 15, 2026.",
        time: "5 hours ago",
        type: "billing",
        isRead: true
    },
    {
        id: "4",
        title: "Project Milestone reached",
        description: "The API Documentation project is now 90% complete.",
        time: "Yesterday",
        type: "team",
        isRead: true,
        sender: { name: "Lana Steiner", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" }
    }
];

export const NotificationCenter = () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const filteredNotifications = notifications.filter(n => filter === "all" || !n.isRead);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-display-xs font-bold text-gray-900 flex items-center gap-3">
                        Notifications
                        {unreadCount > 0 && <Badge variant="brand" size="md">{unreadCount} new</Badge>}
                    </h1>
                    <p className="text-gray-500">Stay updated with the latest activity and system alerts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={markAllAsRead} isDisabled={unreadCount === 0}>
                        Mark all as read
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit border border-gray-200">
                <button
                    onClick={() => setFilter("all")}
                    className={cx("px-4 py-1.5 text-sm font-semibold rounded-md transition", filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900")}
                >
                    All activity
                </button>
                <button
                    onClick={() => setFilter("unread")}
                    className={cx("px-4 py-1.5 text-sm font-semibold rounded-md transition", filter === "unread" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900")}
                >
                    Unread
                </button>
            </div>

            <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((n) => (
                        <Card key={n.id} className={cx("transition-all border-l-4", n.isRead ? "border-l-transparent" : "border-l-brand-600 shadow-xs")}>
                            <CardContent className="p-5 flex gap-4">
                                <div className="shrink-0 pt-1">
                                    {n.sender ? (
                                        <Avatar src={n.sender.avatar} size="md" alt={n.sender.name} />
                                    ) : (
                                        <div className={cx(
                                            "size-10 rounded-full flex items-center justify-center",
                                            n.type === "system" ? "bg-error-50 text-error-600" : "bg-brand-50 text-brand-600"
                                        )}>
                                            {n.type === "system" ? <Shield className="size-5" /> : <Info className="size-5" />}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className={cx("font-bold text-gray-900", !n.isRead && "text-brand-900")}>{n.title}</h4>
                                        <span className="text-xs text-gray-500">{n.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{n.description}</p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            {n.type === "team" && <Users className="size-3.5 text-gray-400" />}
                                            {n.type === "billing" && <CreditCard className="size-3.5 text-gray-400" />}
                                            {n.type === "system" && <Shield className="size-3.5 text-gray-400" />}
                                            <span className="text-xs font-medium text-gray-500 capitalize">{n.type}</span>
                                        </div>
                                        {!n.isRead && (
                                            <button
                                                onClick={() => markAsRead(n.id)}
                                                className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                                            >
                                                <Check className="size-3" /> Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="shrink-0 self-center">
                                    <Dropdown.Root>
                                        <Button variant="tertiary" size="sm" className="p-1 h-8 w-8 text-gray-400">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                        <Dropdown.Popover>
                                            <Dropdown.Menu>
                                                <Dropdown.Item id="delete" icon={Trash2} label="Delete" onClick={() => deleteNotification(n.id)} className="text-error-700" />
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown.Root>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                            <Bell className="size-8 text-gray-300" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-900">No notifications yet</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">We'll let you know when something important happens in your workspace.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
