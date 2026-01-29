"use client";

import type { ReactNode } from "react";
import { Tabs } from "@/components/ui/Tabs";

export type AdminTab = "users" | "roles" | "activity";

interface AdminShellProps {
    children: ReactNode;
    currentTab: AdminTab;
    onTabChange: (tab: AdminTab) => void;
}

export const AdminShell = ({ children, currentTab, onTabChange }: AdminShellProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
                <p className="text-gray-500">Manage users, define security roles, and audit system activity.</p>
            </div>

            <Tabs selectedKey={currentTab} onSelectionChange={(key) => onTabChange(key as AdminTab)}>
                <Tabs.List type="underline">
                    <Tabs.Item id="users">Users</Tabs.Item>
                    <Tabs.Item id="roles">Roles & Permissions</Tabs.Item>
                    <Tabs.Item id="activity">Activity Log</Tabs.Item>
                </Tabs.List>
            </Tabs>

            <div className="mt-6">
                {children}
            </div>
        </div>
    );
};
