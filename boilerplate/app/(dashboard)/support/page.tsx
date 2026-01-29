"use client";

import { useState } from "react";
import { HelpCenter } from "@/components/features/help/HelpCenter";
import { SupportTicketFlow } from "@/components/features/help/SupportTicketFlow";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Page() {
    const [view, setView] = useState<"kb" | "ticket">("kb");

    if (view === "ticket") {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                    variant="tertiary"
                    className="gap-2 -ml-2 text-gray-500 hover:text-gray-900 font-bold"
                    onClick={() => setView("kb")}
                >
                    <ArrowLeft className="size-4" /> Back to Help Center
                </Button>
                <SupportTicketFlow />
            </div>
        );
    }

    return <HelpCenter onContactSupport={() => setView("ticket")} />;
}
