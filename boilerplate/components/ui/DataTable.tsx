"use client";

import { type ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import { PaginationSimple } from "./Pagination";
import { Checkbox } from "./Checkbox";
import { cx } from "@/lib/utils";

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyField: keyof T;
    page?: number;
    total?: number;
    onPageChange?: (page: number) => void;
    enableSelection?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
    emptyState?: ReactNode;
    hidePagination?: boolean;
    showRowsPerPage?: boolean;
    onRowsPerPageChange?: (rows: number) => void;
    rowsPerPage?: number;
}

export function DataTable<T>({
    data,
    columns,
    keyField,
    page = 1,
    total = 1,
    onPageChange,
    enableSelection = false,
    selectedIds = [],
    onSelectionChange,
    emptyState,
    hidePagination = false,
    showRowsPerPage = false,
    onRowsPerPageChange: _onRowsPerPageChange,
    rowsPerPage: _rowsPerPage = 10,
}: DataTableProps<T>) {
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data.map((item) => String(item[keyField]));
            onSelectionChange?.(allIds);
        } else {
            onSelectionChange?.([]);
        }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        if (checked) {
            onSelectionChange?.([...selectedIds, id]);
        } else {
            onSelectionChange?.(selectedIds.filter((selectedId) => selectedId !== id));
        }
    };

    const isAllSelected = data.length > 0 && selectedIds.length === data.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.length;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        {enableSelection && (
                            <TableHead className="w-12 px-6">
                                <Checkbox
                                    isSelected={isAllSelected}
                                    isIndeterminate={isIndeterminate}
                                    onChange={handleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                        )}
                        {columns.map((col, index) => (
                            <TableHead key={index} className={col.className}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item) => {
                            const id = String(item[keyField]);
                            const isSelected = selectedIds.includes(id);

                            return (
                                <TableRow key={id} className={cx(isSelected && "bg-gray-50/50")}>
                                    {enableSelection && (
                                        <TableCell className="px-6">
                                            <Checkbox
                                                isSelected={isSelected}
                                                onChange={(checked) => handleSelectRow(id, checked)}
                                                aria-label={`Select row ${id}`}
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((col, index) => (
                                        <TableCell key={index} className={col.className}>
                                            {col.cell
                                                ? col.cell(item)
                                                : col.accessorKey
                                                    ? String(item[col.accessorKey])
                                                    : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} className="h-24 text-center">
                                {emptyState || "No results."}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {!hidePagination && onPageChange && total > 1 && (
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">
                            {showRowsPerPage && (
                                <span>Showing {data.length} of {total} results</span>
                            )}
                        </div>
                        <PaginationSimple
                            page={page}
                            total={total}
                            onPageChange={onPageChange}
                            className="border-t-0 pt-0 w-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
