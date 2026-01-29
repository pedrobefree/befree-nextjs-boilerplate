"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cx } from "@/lib/utils";

// ============================================
// Pagination Context & Types
// ============================================

interface PaginationContextValue {
    page: number;
    total: number;
    pages: Array<{ type: "page" | "ellipsis"; value: number; isCurrent: boolean }>;
    onPageChange: (page: number) => void;
    canGoPrev: boolean;
    canGoNext: boolean;
}

const PaginationContext = createContext<PaginationContextValue | null>(null);

const usePaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("Pagination components must be used within a Pagination.Root");
    }
    return context;
};

// ============================================
// Utility to generate page numbers
// ============================================

const generatePages = (current: number, total: number, siblingCount: number = 1) => {
    const pages: Array<{ type: "page" | "ellipsis"; value: number; isCurrent: boolean }> = [];

    // Always show first page
    pages.push({ type: "page", value: 1, isCurrent: current === 1 });

    // Calculate range around current page
    const leftSibling = Math.max(2, current - siblingCount);
    const rightSibling = Math.min(total - 1, current + siblingCount);

    // Add left ellipsis if needed
    if (leftSibling > 2) {
        pages.push({ type: "ellipsis", value: -1, isCurrent: false });
    }

    // Add pages around current
    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i > 1 && i < total) {
            pages.push({ type: "page", value: i, isCurrent: current === i });
        }
    }

    // Add right ellipsis if needed
    if (rightSibling < total - 1) {
        pages.push({ type: "ellipsis", value: -2, isCurrent: false });
    }

    // Always show last page if more than 1 page
    if (total > 1) {
        pages.push({ type: "page", value: total, isCurrent: current === total });
    }

    return pages;
};

// ============================================
// Root Component
// ============================================

interface PaginationRootProps {
    /** Current page (1-indexed) */
    page: number;
    /** Total number of pages */
    total: number;
    /** Number of sibling pages to show */
    siblingCount?: number;
    /** Called when page changes */
    onPageChange: (page: number) => void;
    /** Children */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}

const PaginationRoot = ({
    page,
    total,
    siblingCount = 1,
    onPageChange,
    children,
    className,
}: PaginationRootProps) => {
    const pages = useMemo(() => generatePages(page, total, siblingCount), [page, total, siblingCount]);

    const value: PaginationContextValue = {
        page,
        total,
        pages,
        onPageChange,
        canGoPrev: page > 1,
        canGoNext: page < total,
    };

    return (
        <PaginationContext.Provider value={value}>
            <nav aria-label="Pagination" className={className}>
                {children}
            </nav>
        </PaginationContext.Provider>
    );
};

// ============================================
// Sub-components
// ============================================

interface PaginationPrevProps {
    children?: ReactNode;
    className?: string;
}

const PaginationPrev = ({ children, className }: PaginationPrevProps) => {
    const { page, onPageChange, canGoPrev } = usePaginationContext();

    return (
        <Button
            variant="secondary"
            size="sm"
            isDisabled={!canGoPrev}
            onPress={() => onPageChange(page - 1)}
            className={className}
        >
            <ChevronLeft className="size-4" />
            {children}
        </Button>
    );
};

interface PaginationNextProps {
    children?: ReactNode;
    className?: string;
}

const PaginationNext = ({ children, className }: PaginationNextProps) => {
    const { page, onPageChange, canGoNext } = usePaginationContext();

    return (
        <Button
            variant="secondary"
            size="sm"
            isDisabled={!canGoNext}
            onPress={() => onPageChange(page + 1)}
            className={className}
        >
            {children}
            <ChevronRight className="size-4" />
        </Button>
    );
};

interface PaginationItemProps {
    value: number;
    isCurrent: boolean;
    className?: string;
}

const PaginationItem = ({ value, isCurrent, className }: PaginationItemProps) => {
    const { onPageChange } = usePaginationContext();

    return (
        <button
            onClick={() => onPageChange(value)}
            aria-current={isCurrent ? "page" : undefined}
            className={cx(
                "flex size-10 cursor-pointer items-center justify-center p-3 text-sm font-medium rounded-lg transition duration-100 ease-linear",
                "outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                isCurrent
                    ? "bg-primary_hover text-secondary"
                    : "text-quaternary hover:bg-primary_hover hover:text-secondary",
                className,
            )}
        >
            {value}
        </button>
    );
};

const PaginationEllipsis = ({ className }: { className?: string }) => {
    return (
        <span className={cx("flex size-10 shrink-0 items-center justify-center text-tertiary", className)}>
            &hellip;
        </span>
    );
};

interface PaginationPagesProps {
    className?: string;
}

const PaginationPages = ({ className }: PaginationPagesProps) => {
    const { pages } = usePaginationContext();

    return (
        <div className={cx("hidden justify-center gap-0.5 md:flex", className)}>
            {pages.map((page, index) =>
                page.type === "page" ? (
                    <PaginationItem key={index} value={page.value} isCurrent={page.isCurrent} />
                ) : (
                    <PaginationEllipsis key={index} />
                )
            )}
        </div>
    );
};

interface PaginationInfoProps {
    className?: string;
}

const PaginationInfo = ({ className }: PaginationInfoProps) => {
    const { page, total } = usePaginationContext();

    return (
        <span className={cx("text-sm text-fg-secondary", className)}>
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{total}</span>
        </span>
    );
};

// ============================================
// Pre-built Pagination Variants
// ============================================

interface SimplePaginationProps {
    page: number;
    total: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/** Simple pagination with prev/next and page numbers */
export const PaginationSimple = ({ page, total, onPageChange, className }: SimplePaginationProps) => {
    return (
        <PaginationRoot
            page={page}
            total={total}
            onPageChange={onPageChange}
            className={cx("flex w-full items-center justify-between gap-3 border-t border-secondary pt-4 md:pt-5", className)}
        >
            <div className="flex flex-1 justify-start">
                <PaginationPrev>
                    <span className="hidden sm:inline">Previous</span>
                </PaginationPrev>
            </div>

            <PaginationPages />

            {/* Mobile: show page info instead of numbers */}
            <div className="flex md:hidden">
                <PaginationInfo />
            </div>

            <div className="flex flex-1 justify-end">
                <PaginationNext>
                    <span className="hidden sm:inline">Next</span>
                </PaginationNext>
            </div>
        </PaginationRoot>
    );
};

/** Minimal pagination with just prev/next and page info */
export const PaginationMinimal = ({ page, total, onPageChange, className }: SimplePaginationProps) => {
    return (
        <PaginationRoot
            page={page}
            total={total}
            onPageChange={onPageChange}
            className={cx("flex items-center justify-between gap-3", className)}
        >
            <PaginationPrev />
            <PaginationInfo />
            <PaginationNext />
        </PaginationRoot>
    );
};

// ============================================
// Compound Component Export
// ============================================

const PaginationComponent = () => null;

export const Pagination = Object.assign(PaginationComponent, {
    Root: PaginationRoot,
    Prev: PaginationPrev,
    Next: PaginationNext,
    Pages: PaginationPages,
    Item: PaginationItem,
    Ellipsis: PaginationEllipsis,
    Info: PaginationInfo,
});


