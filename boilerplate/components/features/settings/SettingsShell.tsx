"use client";

import type { ReactNode } from "react";
import { Tabs } from "@/components/ui/Tabs";

export type SettingsTab = "profile" | "notifications" | "security" | "api-keys";

interface SettingsShellProps {
    children: ReactNode;
    currentTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

export const SettingsShell = ({ children, currentTab, onTabChange }: SettingsShellProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your account settings and preferences.</p>
            </div>

            <Tabs selectedKey={currentTab} onSelectionChange={(key) => onTabChange(key as SettingsTab)}>
                <Tabs.List type="underline">
                    <Tabs.Item id="profile">My Details</Tabs.Item>
                    <Tabs.Item id="notifications">Notifications</Tabs.Item>
                    <Tabs.Item id="security">Security</Tabs.Item>
                    <Tabs.Item id="api-keys">API Keys</Tabs.Item>
                </Tabs.List>
            </Tabs>

            <div className="mt-6">
                {children}
            </div>
        </div>
    );
};
