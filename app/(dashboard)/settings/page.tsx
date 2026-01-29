"use client";

import { useState } from "react";
import { SettingsShell, type SettingsTab } from "@/components/features/settings/SettingsShell";
import { ProfileSettingsPage } from "@/components/features/settings/ProfileSettingsPage";
import { NotificationsSettingsPage } from "@/components/features/settings/NotificationsSettingsPage";
import { SecuritySettingsPage } from "@/components/features/settings/SecuritySettingsPage";
import { APIKeysPage } from "@/components/features/settings/APIKeysPage";

export default function Page() {
    const [currentTab, setCurrentTab] = useState<SettingsTab>("profile");

    const renderContent = () => {
        switch (currentTab) {
            case "profile":
                return <ProfileSettingsPage />;
            case "notifications":
                return <NotificationsSettingsPage />;
            case "security":
                return <SecuritySettingsPage />;
            case "api-keys":
                return <APIKeysPage />;
            default:
                return null;
        }
    };

    return (
        <SettingsShell currentTab={currentTab} onTabChange={setCurrentTab}>
            {renderContent()}
        </SettingsShell>
    );
}
