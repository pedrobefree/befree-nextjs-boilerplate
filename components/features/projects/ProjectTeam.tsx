"use client";

import { UserPlus, Mail, Settings, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

interface Member {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Viewer";
    avatar: string;
    status: "active" | "invited";
}

const mockMembers: Member[] = [
    { id: "1", name: "Olivia Rhye", email: "olivia@untitledui.com", role: "Admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", status: "active" },
    { id: "2", name: "Phoenix Baker", email: "phoenix@untitledui.com", role: "Editor", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5", status: "active" },
    { id: "3", name: "Lana Steiner", email: "lana@untitledui.com", role: "Viewer", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", status: "active" },
    { id: "4", name: "Demi Wilkinson", email: "demi@untitledui.com", role: "Editor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", status: "invited" },
];

export const ProjectTeam = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Project Team</h2>
                    <p className="text-sm text-gray-500">Manage who has access to this project and their permissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" className="gap-2">
                        <Mail className="size-4" /> Share link
                    </Button>
                    <Button size="sm" className="gap-2">
                        <UserPlus className="size-4" /> Add member
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={member.avatar} alt={member.name} size="md" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900">{member.name}</span>
                                                <span className="text-xs text-gray-500">{member.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="default" size="sm" className="bg-gray-50 text-gray-600 border-gray-200">
                                                {member.role}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={member.status === "active" ? "success" : "default"} size="sm">
                                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="tertiary" size="sm" className="p-2">
                                                <Settings className="size-4 text-gray-400" />
                                            </Button>
                                            <Button variant="tertiary" size="sm" className="p-2 text-error-600">
                                                <MoreHorizontal className="size-4 text-gray-400" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
