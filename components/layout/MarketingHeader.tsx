"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const MarketingHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <BrandLogo size="md" />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/pricing">Pricing</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="tertiary" className="text-gray-600 hover:text-gray-900">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button>Sign up</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
                        <MobileNavLink href="/pricing" onClick={toggleMenu}>Pricing</MobileNavLink>
                        <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
                    </div>
                    <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                        <Link href="/login" onClick={toggleMenu} className="block">
                            <Button variant="tertiary" className="w-full justify-start text-gray-600">Log in</Button>
                        </Link>
                        <Link href="/signup" onClick={toggleMenu} className="block">
                            <Button className="w-full">Sign up</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
    >
        {children}
    </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick: () => void }) => (
    <Link
        href={href}
        className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
        onClick={onClick}
    >
        {children}
    </Link>
);
