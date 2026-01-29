"use client";

import type { ReactNode } from "react";
import { UntitledUiLogo } from "@/components/ui/logos";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

interface MarketingShellProps {
    children: ReactNode;
    currentView: string;
    onViewChange: (view: any) => void;
}

export const MarketingShell = ({ children, currentView, onViewChange }: MarketingShellProps) => {
    const navItems = [
        { label: "Home", view: "landing" },
        { label: "Pricing", view: "pricing" },
        { label: "Contact", view: "contact" },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Navigation */}
            <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <button onClick={() => onViewChange("landing")} className="flex items-center gap-2">
                            <UntitledUiLogo className="h-8 w-auto text-brand-600" />
                            <span className="text-xl font-bold text-gray-900">Untitled UI</span>
                        </button>
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <button
                                    key={item.view}
                                    onClick={() => onViewChange(item.view)}
                                    className={cx(
                                        "text-sm font-semibold transition-colors hover:text-brand-600",
                                        currentView === item.view ? "text-brand-600" : "text-gray-600"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onViewChange("login")}
                            className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
                        >
                            Log in
                        </button>
                        <Button size="md" onClick={() => onViewChange("signup")}>
                            Sign up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-gray-50 py-12 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <UntitledUiLogo className="h-8 w-auto text-brand-600" />
                                <span className="text-xl font-bold text-gray-900">Untitled UI</span>
                            </div>
                            <p className="mt-4 max-w-xs text-base text-gray-500">
                                Design amazing digital experiences that create more happy in the world.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                            <ul className="mt-4 space-y-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Overview</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Features</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Solutions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
                            <ul className="mt-4 space-y-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Documentation</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Blog</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                            <ul className="mt-4 space-y-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Privacy</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Terms</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-brand-600">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 mt-12 md:mt-24">
                        © 2026 Untitled UI. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
