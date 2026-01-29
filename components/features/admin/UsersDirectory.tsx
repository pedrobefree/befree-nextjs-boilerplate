"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown } from "@/components/ui/Dropdown";
import { InviteMemberModal } from "./InviteMemberModal";

export type UserStatus = "active" | "invited" | "suspended";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: UserStatus;
    lastActive: string;
}

const mockUsers: User[] = [
    {
        id: "1",
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Admin",
        status: "active",
        lastActive: "2 hours ago",
    },
    {
        id: "2",
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Viewer",
        status: "invited",
        lastActive: "Dec 25, 2023",
    },
    {
        id: "3",
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Editor",
        status: "active",
        lastActive: "Just now",
    },
    {
        id: "4",
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Developer",
        status: "suspended",
        lastActive: "Jan 2, 2024",
    },
    {
        id: "5",
        name: "Candice Wu",
        email: "candice@untitledui.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        role: "Admin",
        status: "active",
        lastActive: "5 mins ago",
    },
];

export const UsersDirectory = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            header: "User",
            accessorKey: "name",
            cell: (user: User) => (
                <div className="flex items-center gap-3 py-1" data-row-id={user.id}>
                    <Avatar src={user.avatar} size="md" alt={user.name} />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</span>
                        <span className="text-sm text-gray-500 leading-tight">{user.email}</span>
                    </div>
                </div>
            )
        } as any,
        {
            header: "Status",
            accessorKey: "status",
            cell: (user: User) => (
                <Badge variant={
                    user.status === "active" ? "success" :
                        user.status === "suspended" ? "error" :
                            "default"
                } size="sm">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
            )
        } as any,
        {
            header: "Role",
            accessorKey: "role",
            cell: (user: User) => (
                <span className="text-sm text-gray-600">{user.role}</span>
            )
        } as any,
        {
            header: "Last active",
            accessorKey: "lastActive",
            cell: (user: User) => (
                <span className="text-sm text-gray-500">{user.lastActive}</span>
            )
        } as any,
        {
            id: "actions",
            header: "",
            className: "w-10",
            cell: (_user: User) => (
                <div className="flex justify-end">
                    <Dropdown.Root>
                        <Button variant="tertiary" size="sm" className="p-1 h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                        <Dropdown.Popover>
                            <Dropdown.Menu>
                                <Dropdown.Item id="edit">Edit profile</Dropdown.Item>
                                <Dropdown.Item id="resend">Resend invitation</Dropdown.Item>
                                <Dropdown.Separator />
                                <Dropdown.Item id="delete" className="text-error-700">Delete user</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
            )
        } as any
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="text-sm text-gray-500">Manage your team members and their account permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="gap-2">
                        <Filter className="h-4 w-4" /> Filters
                    </Button>
                    <Button className="gap-2" onClick={() => setIsInviteModalOpen(true)}>
                        <Plus className="h-4 w-4" /> Add user
                    </Button>
                </div>
            </div>

            <div className="flex flex-col rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                <div className="p-4 flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search users..."
                            className="pl-10 h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
                            <span className="text-sm font-semibold text-gray-700">{selectedIds.length} users selected</span>
                            <Button variant="destructive" size="sm">Delete selected</Button>
                        </div>
                    )}
                </div>

                <DataTable
                    data={filteredUsers}
                    columns={columns}
                    keyField="id"
                    enableSelection
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    total={filteredUsers.length}
                    page={1}
                    onPageChange={() => { }}
                    showRowsPerPage
                    hidePagination={false}
                />
            </div>

            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onOpenChange={setIsInviteModalOpen}
                onInvite={(email, role) => {
                    console.log(`Inviting ${email} as ${role}`);
                    // In a real app, this would be an API call
                }}
            />
        </div>
    );
};
