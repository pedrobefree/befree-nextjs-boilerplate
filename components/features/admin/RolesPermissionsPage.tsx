"use client";

import { Shield, Info, Check, X, ShieldAlert, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

interface Permission {
    name: string;
    description: string;
    roles: {
        admin: boolean;
        editor: boolean;
        viewer: boolean;
    };
}

const permissions: Permission[] = [
    {
        name: "User Management",
        description: "Create, edit, and delete user accounts and permissions.",
        roles: { admin: true, editor: false, viewer: false }
    },
    {
        name: "Billing Access",
        description: "View and manage subscriptions, invoices, and payment methods.",
        roles: { admin: true, editor: false, viewer: false }
    },
    {
        name: "Content Creation",
        description: "Draft, edit, and publish projects and content.",
        roles: { admin: true, editor: true, viewer: false }
    },
    {
        name: "Shared Analytics",
        description: "View performance data and system-wide reports.",
        roles: { admin: true, editor: true, viewer: true }
    },
    {
        name: "API Keys",
        description: "Generate and revoke API keys for external integrations.",
        roles: { admin: true, editor: false, viewer: false }
    },
    {
        name: "Export Data",
        description: "Download project data and reports in CSV/PDF format.",
        roles: { admin: true, editor: true, viewer: false }
    }
];

export const RolesPermissionsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
                    <p className="text-sm text-gray-500">Define access levels and control what team members can see and do.</p>
                </div>
                <Button className="gap-2">
                    <UserPlus className="h-4 w-4" /> Create custom role
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RoleCard
                    title="Administrator"
                    count={2}
                    icon={ShieldAlert}
                    description="Full access to all features, settings, and billing operations."
                />
                <RoleCard
                    title="Editor"
                    count={12}
                    icon={ShieldCheck}
                    description="Can manage content and projects but cannot change system settings."
                />
                <RoleCard
                    title="Viewer"
                    count={45}
                    icon={Shield}
                    description="Read-only access to projects and basic analytics reports."
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Permission Matrix</CardTitle>
                    <CardDescription>A summary of capabilities assigned to each default role.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-y border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Permission</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Admin</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Editor</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">Viewer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {permissions.map((perm) => (
                                    <tr key={perm.name} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-sm font-bold text-gray-900">{perm.name}</span>
                                                    <Info className="h-3 w-3 text-gray-300 cursor-help" />
                                                </div>
                                                <span className="text-xs text-gray-500">{perm.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <PermissionStatus enabled={perm.roles.admin} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <PermissionStatus enabled={perm.roles.editor} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <PermissionStatus enabled={perm.roles.viewer} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const RoleCard = ({ title, count, description, icon: Icon }: { title: string, count: number, description: string, icon: any }) => (
    <Card className="hover:border-brand-300 transition-colors">
        <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <Badge variant="default">{count} users</Badge>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const PermissionStatus = ({ enabled }: { enabled: boolean }) => (
    <div className="flex justify-center">
        {enabled ? (
            <div className="h-6 w-6 rounded-full bg-success-50 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-success-600 font-bold" />
            </div>
        ) : (
            <div className="h-6 w-6 rounded-full bg-gray-50 flex items-center justify-center">
                <X className="h-3.5 w-3.5 text-gray-300" />
            </div>
        )}
    </div>
);
