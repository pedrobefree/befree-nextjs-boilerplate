"use client";

import * as React from "react";
import { Search, FileText, Users, Settings, HelpCircle, MessageSquare, ArrowRight, LayoutGrid } from "lucide-react";
import { Dialog, Modal, ModalOverlay } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";

interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon: React.ElementType;
    category: "Pages" | "Users" | "Actions" | "Help";
    onClick: () => void;
}

interface CommandPaletteProps {
    onNavigate?: (view: string) => void;
}

export const CommandPalette = ({ onNavigate }: CommandPaletteProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        const handleOpen = (e: any) => {
            setIsOpen(true);
            if (e.detail?.search) {
                setSearch(e.detail.search);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-command-palette", handleOpen);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-command-palette", handleOpen);
        };
    }, []);

    const commands: CommandItem[] = [
        // Pages
        { id: "dashboard", title: "Dashboard", description: "View your metrics and overview", icon: LayoutGrid, category: "Pages", onClick: () => onNavigate?.("dashboard") },
        { id: "projects", title: "Projects", description: "Manage your active projects", icon: FileText, category: "Pages", onClick: () => onNavigate?.("projects") },
        { id: "users", title: "User Directory", description: "Manage your team and roles", icon: Users, category: "Pages", onClick: () => onNavigate?.("users") },
        { id: "settings", title: "Settings", description: "Workspace and profile configuration", icon: Settings, category: "Pages", onClick: () => onNavigate?.("settings") },
        { id: "notifications", title: "Inbox", description: "View your activity feed", icon: MessageSquare, category: "Pages", onClick: () => onNavigate?.("notifications") },
        { id: "support", title: "Support", description: "Get help and support", icon: HelpCircle, category: "Pages", onClick: () => onNavigate?.("support") },

        // Users (Simulated Search Results)
        { id: "user-olivia", title: "Olivia Rhye", description: "Product Designer @ Untitled UI", icon: Users, category: "Users", onClick: () => onNavigate?.("users") },
        { id: "user-phoenix", title: "Phoenix Baker", description: "Engineering Manager @ Untitled UI", icon: Users, category: "Users", onClick: () => onNavigate?.("users") },

        // Projects (Simulated Search Results)
        { id: "proj-ui", title: "UI Redesign", description: "Active Project • Milestone: Phase 2", icon: FileText, category: "Actions", onClick: () => onNavigate?.("projects") },
        { id: "proj-api", title: "API Documentation", description: "Internal Project • Due Feb 15", icon: FileText, category: "Actions", onClick: () => onNavigate?.("projects") },

        // Actions
        { id: "invite", title: "Invite Member", description: "Send an invitation email", icon: Users, category: "Actions", onClick: () => onNavigate?.("users") },
        { id: "new-project", title: "Create New Project", description: "Start a fresh workspace project", icon: FileText, category: "Actions", onClick: () => window.dispatchEvent(new CustomEvent("open-new-project-wizard")) },

        // Help
        { id: "feedback", title: "Send Feedback", description: "Tell us what you think", icon: MessageSquare, category: "Help", onClick: () => onNavigate?.("support") },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    const categories = ["Pages", "Users", "Actions", "Help"] as const;

    if (!isOpen) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable className="items-start pt-[10dvh]">
            <Modal className="max-w-2xl w-full p-0 overflow-hidden bg-white shadow-2xl border-none">
                <Dialog className="outline-hidden">
                    <div className="flex flex-col h-full max-h-[60vh]">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                            <Search className="size-5 text-gray-400" />
                            <input
                                autoFocus
                                placeholder="Search for pages, users, or actions..."
                                className="flex-1 bg-transparent border-none outline-hidden text-lg text-gray-900 placeholder:text-gray-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">ESC</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2">
                            {filteredCommands.length > 0 ? (
                                categories.map(cat => {
                                    const catCmds = filteredCommands.filter(c => c.category === cat);
                                    if (catCmds.length === 0) return null;

                                    return (
                                        <div key={cat} className="mb-4 last:mb-0">
                                            <h3 className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat}</h3>
                                            <div className="space-y-1">
                                                {catCmds.map(cmd => (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => {
                                                            cmd.onClick();
                                                            setIsOpen(false);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group text-left"
                                                    >
                                                        <div className="size-9 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:border-brand-200 transition-colors">
                                                            <cmd.icon className="size-5 text-gray-500 group-hover:text-brand-600 transition-colors" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-gray-900">{cmd.title}</span>
                                                                {cmd.id === "new-project" && <Badge variant="brand" size="sm">Hot</Badge>}
                                                            </div>
                                                            {cmd.description && <p className="text-xs text-gray-500 truncate">{cmd.description}</p>}
                                                        </div>
                                                        <ArrowRight className="size-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="size-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="size-6 text-gray-300" />
                                    </div>
                                    <h4 className="font-bold text-gray-900">No results found</h4>
                                    <p className="text-sm text-gray-500">Try searching for something else.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-6">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5"><ArrowRight className="size-3 rotate-90" /> Select</span>
                                <span className="flex items-center gap-1.5"><ArrowRight className="size-3" /> Execute</span>
                            </div>
                            <span>Untitled UI Pro</span>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
