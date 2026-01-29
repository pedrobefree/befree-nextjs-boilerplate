"use client";

import { DashboardPage } from "@/components/features/dashboard/DashboardPage";

/**
 * Dashboard Home Page
 */
export default function Page() {
    const handleNewProject = () => {
        window.dispatchEvent(new CustomEvent("open-new-project-wizard"));
    };

    return <DashboardPage onNewProject={handleNewProject} />;
}
