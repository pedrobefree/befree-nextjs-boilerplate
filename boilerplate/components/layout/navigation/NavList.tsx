"use client";

import { cx } from "@/lib/utils";
import { NavItemBase } from "./NavItem";

export type NavItemType = {
    label: string
    href?: string
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
    badge?: React.ReactNode
    items?: NavItemType[]
    divider?: never
}

export type NavItemDividerType = {
    divider: true
    items?: never
}

interface NavListProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Additional CSS classes to apply to the list. */
    className?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
    /** Callback when an item is clicked. */
    onItemClick?: (item: NavItemType) => void;
}

export const NavList = ({ activeUrl, items, className, onItemClick }: NavListProps) => {
    return (
        <ul className={cx("mt-4 flex flex-col px-2 lg:px-4", className)}>
            {items.map((item, index) => {
                if (item.divider) {
                    return (
                        <li key={index} className="w-full px-0.5 py-2">
                            <hr className="h-px w-full border-none bg-border-secondary" />
                        </li>
                    );
                }

                const navItem = item as NavItemType;

                if (navItem.items?.length) {
                    return (
                        <details
                            key={navItem.label}
                            open={activeUrl === navItem.href || navItem.items.some(i => i.href === activeUrl)}
                            className="appearance-none py-0.5"
                        >
                            <NavItemBase
                                href={navItem.href}
                                badge={navItem.badge}
                                icon={navItem.icon}
                                type="collapsible"
                                onClick={(e) => {
                                    if (onItemClick) {
                                        // Use preventDefault only for pure collapsible headers that don't have href
                                        if (!navItem.href) e.preventDefault();
                                        onItemClick(navItem);
                                    }
                                }}
                            >
                                {navItem.label}
                            </NavItemBase>

                            <dd>
                                <ul className="py-0.5">
                                    {navItem.items.map((childItem) => (
                                        <li key={childItem.label} className="py-0.5">
                                            <NavItemBase
                                                href={childItem.href}
                                                badge={childItem.badge}
                                                type="collapsible-child"
                                                current={activeUrl === childItem.href}
                                                onClick={(_e) => {
                                                    if (onItemClick) {
                                                        // Don't prevent default, allow navigation
                                                        onItemClick(childItem);
                                                    }
                                                }}
                                            >
                                                {childItem.label}
                                            </NavItemBase>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </details>
                    );
                }

                return (
                    <li key={navItem.label} className="py-0.5">
                        <NavItemBase
                            type="link"
                            badge={navItem.badge}
                            icon={navItem.icon}
                            href={navItem.href}
                            current={activeUrl === navItem.href}
                            onClick={(_e) => {
                                if (onItemClick) {
                                    // Don't prevent default, allow navigation
                                    onItemClick(navItem);
                                }
                            }}
                        >
                            {navItem.label}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
};
