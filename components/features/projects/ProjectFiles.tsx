"use client";

import { useState } from "react";
import { FileText, Image as ImageIcon, FileCode, MoreHorizontal, Download, Search, LayoutGrid, List, CloudUpload, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cx } from "@/lib/utils";

interface ProjectFile {
    id: string;
    name: string;
    size: string;
    type: "document" | "image" | "code";
    lastUpdated: string;
    updatedBy: string;
}

const mockFiles: ProjectFile[] = [
    { id: "1", name: "Project_Manifesto.pdf", size: "2.4 MB", type: "document", lastUpdated: "2 hours ago", updatedBy: "Olivia Rhye" },
    { id: "2", name: "Design_Specs_v2.fig", size: "14.8 MB", type: "document", lastUpdated: "Yesterday", updatedBy: "Phoenix Baker" },
    { id: "3", name: "landing_page_hero.png", size: "1.2 MB", type: "image", lastUpdated: "3 days ago", updatedBy: "Lana Steiner" },
    { id: "4", name: "theme_config.json", size: "4 KB", type: "code", lastUpdated: "Jan 25", updatedBy: "Olivia Rhye" },
    { id: "5", name: "marketing_assets.zip", size: "124 MB", type: "document", lastUpdated: "Jan 20", updatedBy: "Demi Wilkinson" },
];

export const ProjectFiles = () => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");

    const filteredFiles = mockFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Files & Docs</h2>
                    <p className="text-sm text-gray-500">Manage and share documents related to this project.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        <button
                            onClick={() => setView("grid")}
                            className={cx("p-1.5 rounded-md transition", view === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900")}
                        >
                            <LayoutGrid className="size-4" />
                        </button>
                        <button
                            onClick={() => setView("list")}
                            className={cx("p-1.5 rounded-md transition", view === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900")}
                        >
                            <List className="size-4" />
                        </button>
                    </div>
                    <Button size="sm" className="gap-2">
                        <CloudUpload className="size-4" /> Upload
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Input
                    placeholder="Search files..."
                    leftIcon={<Search className="size-4" />}
                    className="h-9"
                    containerClassName="max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredFiles.map(file => (
                        <FileCard key={file.id} file={file} />
                    ))}
                    <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-500 hover:bg-brand-25/30 transition-all group min-h-[160px]">
                        <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                            <Plus className="size-5 text-gray-400 group-hover:text-brand-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-500 group-hover:text-brand-700">Add new file</span>
                    </button>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {filteredFiles.map(file => (
                                <FileListItem key={file.id} file={file} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

const FileIcon = ({ type, className }: { type: string, className?: string }) => {
    if (type === "image") return <ImageIcon className={className} />;
    if (type === "code") return <FileCode className={className} />;
    return <FileText className={className} />;
};

const FileCard = ({ file }: { file: ProjectFile }) => (
    <Card className="hover:border-brand-300 transition-all cursor-pointer group shadow-xs">
        <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
                <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-brand-50 group-hover:border-brand-100 transition-colors">
                    <FileIcon type={file.type} className="size-5 text-gray-400 group-hover:text-brand-600" />
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="size-4" />
                </button>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900 group-hover:text-brand-800 transition-colors truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-gray-50">
                <span className="text-[10px] text-gray-400">Updated {file.lastUpdated}</span>
                <button className="text-gray-400 hover:text-brand-600 p-1">
                    <Download className="size-3.5" />
                </button>
            </div>
        </CardContent>
    </Card>
);

const FileListItem = ({ file }: { file: ProjectFile }) => (
    <div className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4 min-w-0">
            <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-brand-50 transition-colors shrink-0">
                <FileIcon type={file.type} className="size-5 text-gray-400 group-hover:text-brand-600" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size} • By {file.updatedBy}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:inline-block">Updated {file.lastUpdated}</span>
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="tertiary" size="sm" className="p-2">
                    <Download className="size-4" />
                </Button>
                <Button variant="tertiary" size="sm" className="p-2">
                    <MoreHorizontal className="size-4" />
                </Button>
            </div>
        </div>
    </div>
);
