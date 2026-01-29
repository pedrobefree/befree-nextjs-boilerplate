import * as React from "react"
import { useRouter } from "next/navigation"
import { BarChart2, Users, Settings, Search, LayoutGrid, Inbox, LifeBuoy } from "lucide-react"
import { NavList, NavAccountCard, MobileNavigationHeader } from "./navigation/SidebarNavigation"
import type { NavItemType } from "./navigation/NavList"
import { Badge } from "@/components/ui/Badge"
import { UserMenu } from "./navigation/UserMenu"
import { NotificationPopover } from "../features/notifications/NotificationPopover"
import { CommandPalette } from "./CommandPalette"

import { CreateProjectWizard } from "../features/projects/CreateProjectWizard"
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal"

const navigation: (NavItemType & { view: string })[] = [
    { label: "Dashboard", href: "/dashboard", view: "dashboard", icon: LayoutGrid },
    { label: "Projects", href: "/projects", view: "projects", icon: BarChart2 },
    { label: "Users", href: "/users", view: "users", icon: Users },
    { label: "Inbox", href: "/notifications", view: "notifications", icon: Inbox, badge: <Badge variant="brand" size="sm">3</Badge> },
    { label: "Settings", href: "/settings", view: "settings", icon: Settings },
    { label: "Support", href: "/support", view: "support", icon: LifeBuoy },
]

interface AppShellProps {
    children: React.ReactNode;
    currentView?: string;
    onViewChange?: (view: any) => void;
}

export function AppShell({ children, currentView, onViewChange }: AppShellProps) {
    const router = useRouter();
    const [isWizardOpen, setIsWizardOpen] = React.useState(false);

    React.useEffect(() => {
        const handleOpenWizard = () => setIsWizardOpen(true);
        window.addEventListener("open-new-project-wizard", handleOpenWizard);
        return () => window.removeEventListener("open-new-project-wizard", handleOpenWizard);
    }, []);

    const handleNavClick = (item: any) => {
        if (onViewChange && item.view) {
            onViewChange(item.view);
        } else if (item.href) {
            router.push(item.href);
        }
    };

    const activeUrl = navigation.find(n => n.view === currentView)?.href || "/dashboard";

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col w-72 border-r border-gray-200 bg-white h-screen sticky top-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900 cursor-pointer" onClick={() => onViewChange?.('dashboard')}>
                        <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                            U
                        </div>
                        Untitled UI
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <NavList items={navigation} activeUrl={activeUrl} onItemClick={handleNavClick} />
                </div>

                <div className="p-4 border-t border-gray-200">
                    <NavAccountCard />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-12 sticky top-0 z-10 gap-4">
                    <div className="flex items-center gap-4 lg:hidden min-w-0 flex-1">
                        <MobileNavigationHeader>
                            {(close) => (
                                <div className="p-4">
                                    <NavList
                                        items={navigation}
                                        activeUrl={activeUrl}
                                        onItemClick={(item) => {
                                            handleNavClick(item);
                                            close();
                                        }}
                                    />
                                </div>
                            )}
                        </MobileNavigationHeader>
                        <div className="font-bold text-lg text-gray-900 truncate" onClick={() => onViewChange?.('dashboard')}>
                            Untitled UI
                        </div>
                    </div>

                    <div className="relative group max-w-md w-full hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
                        <input
                            type="text"
                            placeholder="Search or type a command (⌘K)"
                            readOnly
                            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer transition-all hover:bg-white hover:border-brand-200"
                        />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <NotificationPopover />
                        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                            <UserMenu />
                        </div>
                    </div>
                </div>
                <div className="p-4 lg:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
            <CommandPalette onNavigate={(view) => {
                if (onViewChange) {
                    onViewChange(view);
                } else {
                    const item = navigation.find(n => n.view === view);
                    if (item?.href) {
                        router.push(item.href);
                    }
                }
            }} />

            {/* Global Project Wizard */}
            <ModalOverlay isOpen={isWizardOpen} onOpenChange={setIsWizardOpen} isDismissable>
                <Modal className="sm:max-w-4xl max-h-[90vh] bg-transparent shadow-none border-none p-0 overflow-visible">
                    <Dialog className="outline-none h-full">
                        <CreateProjectWizard
                            onClose={() => setIsWizardOpen(false)}
                            onComplete={(data) => {
                                console.log("New project data:", data);
                                setIsWizardOpen(false);
                            }}
                        />
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    )
}
