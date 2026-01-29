"use client";

import Link from "next/link";
import { UntitledUiLogo } from "@/components/ui/logos";

export const MarketingFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-4">
                            <li><NavLink href="#">Overview</NavLink></li>
                            <li><NavLink href="#">Features</NavLink></li>
                            <li><NavLink href="/pricing">Pricing</NavLink></li>
                            <li><NavLink href="#">Releases</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><NavLink href="#">About</NavLink></li>
                            <li><NavLink href="#">Careers</NavLink></li>
                            <li><NavLink href="#">Blog</NavLink></li>
                            <li><NavLink href="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li><NavLink href="#">Documentation</NavLink></li>
                            <li><NavLink href="/support">Help Center</NavLink></li>
                            <li><NavLink href="#">Guides</NavLink></li>
                            <li><NavLink href="#">API Status</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><NavLink href="#">Privacy</NavLink></li>
                            <li><NavLink href="#">Terms</NavLink></li>
                            <li><NavLink href="#">Cookies</NavLink></li>
                            <li><NavLink href="#">Licenses</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-gray-900">
                        <UntitledUiLogo className="h-8 w-auto text-gray-900" />
                    </div>
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Untitled UI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-base text-gray-600 hover:text-gray-900 transition-colors">
        {children}
    </Link>
);
