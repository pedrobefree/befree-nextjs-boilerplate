"use client";

import { Search, Download, Filter } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Activity {
    id: string;
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    event: string;
    target: string;
    date: string;
    time: string;
    status: "success" | "warning" | "error";
}

const mockActivity: Activity[] = [
    {
        id: "log_1",
        user: { name: "Olivia Rhye", email: "olivia@untitledui.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
        event: "Updated user role",
        target: "Phoenix Baker",
        date: "Today",
        time: "2:45 PM",
        status: "success",
    },
    {
        id: "log_2",
        user: { name: "Lana Steiner", email: "lana@untitledui.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
        event: "Created new project",
        target: "Marketing Q1",
        date: "Today",
        time: "1:12 PM",
        status: "success",
    },
    {
        id: "log_3",
        user: { name: "Candice Wu", email: "candice@untitledui.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
        event: "Failed login attempt",
        target: "Account login",
        date: "Today",
        time: "09:30 AM",
        status: "error",
    },
    {
        id: "log_4",
        user: { name: "Olivia Rhye", email: "olivia@untitledui.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
        event: "Changed API settings",
        target: "Stripe Integration",
        date: "Yesterday",
        time: "4:20 PM",
        status: "warning",
    },
];

export const ActivityLog = () => {
    const columns = [
        {
            header: "User",
            accessorKey: "user",
            cell: (row: Activity) => (
                <div className="flex items-center gap-3">
                    <Avatar src={row.user.avatar} size="sm" alt={row.user.name} />
                    <span className="text-sm font-semibold text-gray-900">{row.user.name}</span>
                </div>
            )
        } as any,
        {
            header: "Event",
            accessorKey: "event",
            cell: (row: Activity) => (
                <div className="flex flex-col py-1">
                    <span className="text-sm text-gray-900 font-semibold">{row.event}</span>
                    <span className="text-xs text-gray-500">Target: {row.target}</span>
                </div>
            )
        } as any,
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: Activity) => (
                <Badge variant={row.status === "success" ? "success" : row.status === "warning" ? "warning" : "error"} size="sm">
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Badge>
            )
        } as any,
        {
            header: "Date/Time",
            accessorKey: "date",
            cell: (row: Activity) => (
                <div className="flex flex-col">
                    <span className="text-sm text-gray-900 font-medium">{row.date}</span>
                    <span className="text-xs text-gray-500">{row.time}</span>
                </div>
            )
        } as any
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
                    <p className="text-sm text-gray-500">Monitor all system events and user actions across the platform.</p>
                </div>
                <Button variant="secondary" className="gap-2">
                    <Download className="h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 flex items-center justify-between gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Filter logs..." className="pl-10 h-10" />
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2 h-10">
                        <Filter className="h-4 w-4" /> More filters
                    </Button>
                </div>
                <DataTable
                    data={mockActivity}
                    columns={columns}
                    keyField="id"
                    total={mockActivity.length}
                    page={1}
                    onPageChange={() => { }}
                />
            </div>
        </div>
    );
};
