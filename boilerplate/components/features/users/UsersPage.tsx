import { Plus, Search, MoreVertical, CheckCircle, XCircle, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import { InviteMemberModal } from "./InviteMemberModal";
import { EditMemberModal } from "./EditMemberModal";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member" | "viewer";
    status: "active" | "inactive" | "pending";
    avatar: string;
    lastActive: string;
    projects: number;
}

const mockUsers: User[] = [
    {
        id: "1",
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        role: "admin",
        status: "active",
        avatar: "OR",
        lastActive: "2 hours ago",
        projects: 12
    },
    {
        id: "2",
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        role: "member",
        status: "active",
        avatar: "PB",
        lastActive: "5 hours ago",
        projects: 8
    },
    {
        id: "3",
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        role: "member",
        status: "active",
        avatar: "LS",
        lastActive: "1 day ago",
        projects: 15
    },
    {
        id: "4",
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        role: "viewer",
        status: "active",
        avatar: "DW",
        lastActive: "3 days ago",
        projects: 3
    },
    {
        id: "5",
        name: "Candice Wu",
        email: "candice@untitledui.com",
        role: "member",
        status: "inactive",
        avatar: "CW",
        lastActive: "2 weeks ago",
        projects: 6
    },
    {
        id: "6",
        name: "Natali Craig",
        email: "natali@untitledui.com",
        role: "viewer",
        status: "pending",
        avatar: "NC",
        lastActive: "Never",
        projects: 0
    }
];

export const UsersPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleColor = (role: User["role"]) => {
        switch (role) {
            case "admin": return "error";
            case "member": return "brand";
            case "viewer": return "default";
            default: return "default";
        }
    };

    const getStatusIcon = (status: User["status"]) => {
        switch (status) {
            case "active": return <CheckCircle className="size-4 text-success-600" />;
            case "inactive": return <XCircle className="size-4 text-gray-400" />;
            case "pending": return <div className="size-4 rounded-full border-2 border-warning-600 border-t-transparent animate-spin" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-display-xs sm:text-display-sm font-bold text-gray-900 tracking-tight">Team Members</h1>
                    <p className="text-gray-500 text-base sm:text-lg mt-1">Manage your team and their permissions</p>
                </div>
                <Button
                    className="gap-2 shadow-lg shadow-brand-500/20 flex-1 sm:flex-none"
                    onClick={() => setIsInviteModalOpen(true)}
                >
                    <Plus className="size-4" /> Invite Member
                </Button>
            </header>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        aria-label="Search team members"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        aria-label="Filter by role"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                        <option value="viewer">Viewer</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        aria-label="Filter by status"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* User Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500">Total Members</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{mockUsers.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500">Active</p>
                        <p className="text-2xl font-bold text-success-600 mt-1">
                            {mockUsers.filter(u => u.status === "active").length}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold text-warning-600 mt-1">
                            {mockUsers.filter(u => u.status === "pending").length}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500">Admins</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {mockUsers.filter(u => u.role === "admin").length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Users List */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Last Active
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Projects
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold text-sm">
                                                {user.avatar}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <Badge variant={getRoleColor(user.role)} size="sm">
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(user.status)}
                                            <span className="text-sm text-gray-600 capitalize">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                        {user.lastActive}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                                        {user.projects}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <MenuTrigger>
                                            <Button variant="tertiary" size="sm" aria-label="User options">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                            <Popover className="min-w-[160px] p-1 bg-white rounded-lg border border-gray-200 shadow-lg outline-none origin-top-right transition duration-100 ease-out data-[entering]:scale-95 data-[entering]:opacity-0 data-[exiting]:scale-95 data-[exiting]:opacity-0">
                                                <Menu className="outline-none" onAction={(key) => {
                                                    if (key === "edit") setUserToEdit(user);
                                                }}>
                                                    <MenuItem id="edit" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-50 focus:bg-gray-50 outline-none">
                                                        <Edit2 className="size-4 text-gray-400" /> Edit member
                                                    </MenuItem>
                                                    <MenuItem id="delete" className="flex items-center gap-2 px-3 py-2 text-sm text-error-700 rounded-md cursor-pointer hover:bg-error-50 focus:bg-error-50 outline-none">
                                                        <Trash2 className="size-4 text-error-400" /> Delete member
                                                    </MenuItem>
                                                </Menu>
                                            </Popover>
                                        </MenuTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No members found matching your criteria.</p>
                </div>
            )}

            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />

            <EditMemberModal
                isOpen={!!userToEdit}
                onClose={() => setUserToEdit(null)}
                member={userToEdit}
            />
        </div>
    );
};
