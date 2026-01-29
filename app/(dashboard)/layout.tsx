"use client";

import { AppShell } from "@/components/layout/AppShell";
import { usePathname } from "next/navigation";

/**
 * Dashboard Layout
 * Wraps all dashboard pages in the sidebar and top navigation.
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Extract view name from pathname for AppShell's active state
    const currentView = pathname.split("/").pop() || "dashboard";

    return (
        <AppShell currentView={currentView}>
            {children}
        </AppShell>
    );
}
