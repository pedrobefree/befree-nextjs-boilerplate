"use client";

import { useState } from "react";
import { LayoutGrid, List, Plus, Search, MoreHorizontal, Clock, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AvatarGroupRoot as AvatarGroup } from "@/components/ui/AvatarGroup";
import { Card, CardContent } from "@/components/ui/Card";
import { Dropdown } from "@/components/ui/Dropdown";
import { DataTable } from "@/components/ui/DataTable";
import { cx } from "@/lib/utils";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed" | "on-hold";
    progress: number;
    team: string[];
    lastUpdated: string;
    category: string;
}

const mockProjects: Project[] = [
    {
        id: "1",
        name: "Untitled UI Redesign",
        description: "Modernizing the core UI library with new tokens and components.",
        status: "active",
        progress: 75,
        team: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
        ],
        lastUpdated: "2 mins ago",
        category: "Product"
    },
    {
        id: "2",
        name: "Mobile App Launch",
        description: "Coordinating the Q1 launch for iOS and Android platforms.",
        status: "on-hold",
        progress: 45,
        team: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        ],
        lastUpdated: "4 hours ago",
        category: "Marketing"
    },
    {
        id: "3",
        name: "API Documentation",
        description: "Complete overhaul of the external developer portal.",
        status: "active",
        progress: 90,
        team: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        ],
        lastUpdated: "Yesterday",
        category: "Internal"
    },
    {
        id: "4",
        name: "Billing Integration",
        description: "Connecting Stripe Connect for marketplace payouts.",
        status: "completed",
        progress: 100,
        team: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
        ],
        lastUpdated: "3 days ago",
        category: "Fintech"
    }
];

export const ProjectDashboard = ({ onCreateClick, onProjectClick }: { onCreateClick: () => void, onProjectClick: (p: Project) => void }) => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");

    const filteredProjects = mockProjects.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );

    const listColumns = [
        {
            header: "Project",
            accessorKey: "name",
            cell: (p: Project) => (
                <div
                    className="flex flex-col cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors"
                    onClick={() => onProjectClick(p)}
                >
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className="text-xs text-gray-500 line-clamp-1">{p.description}</span>
                </div>
            )
        } as any,
        {
            header: "Status",
            accessorKey: "status",
            cell: (p: Project) => (
                <Badge variant={p.status === "active" ? "success" : p.status === "completed" ? "brand" : "warning"} size="sm">
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </Badge>
            )
        } as any,
        {
            header: "Progress",
            accessorKey: "progress",
            cell: (p: Project) => (
                <div className="flex items-center gap-3 min-w-[120px]">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-600 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{p.progress}%</span>
                </div>
            )
        } as any,
        {
            header: "Team",
            accessorKey: "team",
            cell: (p: Project) => (
                <AvatarGroup limit={3} className="scale-90 origin-left">
                    {p.team.map((src, i) => <AvatarGroup.Item key={i} src={src} />)}
                </AvatarGroup>
            )
        } as any,
        {
            id: "actions",
            header: "",
            cell: () => (
                <div className="flex justify-end pr-4">
                    <Button variant="tertiary" size="sm" className="p-1 h-8 w-8">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </div>
            )
        } as any
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 className="text-display-xs font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-500">Manage your active projects and track team progress across the workspace.</p>
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
                    <Button className="gap-2" onClick={onCreateClick}>
                        <Plus className="size-4" /> New project
                    </Button>
                </div>
            </div>

            <Input
                placeholder="Search projects..."
                leftIcon={<Search className="size-4" />}
                containerClassName="max-w-md"
                className="h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <DataTable
                        data={filteredProjects}
                        columns={listColumns}
                        keyField="id"
                        hidePagination
                    />
                </div>
            )}
        </div>
    );
};

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => (
    <Card
        className="group hover:border-brand-300 transition-all hover:shadow-md cursor-pointer"
        onClick={onClick}
    >
        <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
                <Badge variant="default" size="sm" className="bg-gray-50 border-gray-200 text-gray-600">
                    {project.category}
                </Badge>
                <Dropdown.Root>
                    <Button
                        variant="tertiary"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-400 group-hover:text-gray-600"
                        onPress={(e: any) => e.continuePropagation()}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu onAction={(id) => id === "view" && onClick()}>
                            <Dropdown.Item id="view">View project</Dropdown.Item>
                            <Dropdown.Item id="edit">Edit project</Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item id="archive" className="text-error-700">Archive</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown.Root>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">{project.name}</h4>
                <ArrowUpRight className="size-4 text-gray-300 group-hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all" />
            </div>

            <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">{project.description}</p>

            <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="size-3.5" />
                        <span>Updated {project.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{project.progress}%</span>
                    </div>
                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={cx(
                            "h-full rounded-full transition-all duration-500",
                            project.progress === 100 ? "bg-success-600" : "bg-brand-600"
                        )}
                        style={{ width: `${project.progress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                        <AvatarGroup limit={3}>
                            {project.team.map((src, i) => <AvatarGroup.Item key={i} src={src} />)}
                        </AvatarGroup>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <Users className="size-3.5" />
                        <span>{project.team.length} members</span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);
