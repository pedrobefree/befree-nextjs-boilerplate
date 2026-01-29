"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cx } from "@/lib/utils";

export interface BreadcrumbItemProps {
    href?: string;
    label: string;
    isCurrent?: boolean;
    icon?: React.ElementType;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItemProps[];
    className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
    return (
        <nav aria-label="Breadcrumb" className={cx("flex", className)}>
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.label} className="flex items-center">
                            {index !== 0 && (
                                <ChevronRight className="mr-2 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                            )}

                            <a
                                href={item.href || "#"}
                                className={cx(
                                    "flex items-center text-sm font-medium transition-colors hover:text-gray-900",
                                    item.isCurrent
                                        ? "text-brand-700 font-semibold"
                                        : "text-gray-500"
                                )}
                                aria-current={item.isCurrent ? "page" : undefined}
                            >
                                {Icon && <Icon className={cx("mr-2 h-4 w-4 shrink-0", item.isCurrent ? "text-brand-600" : "text-gray-400")} />}
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
