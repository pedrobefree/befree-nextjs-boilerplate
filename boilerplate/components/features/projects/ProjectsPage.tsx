import { Plus, Search, Filter, MoreVertical, Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Button as AriaButton } from "react-aria-components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { FilterSheet } from "@/components/ui/FilterSheet";
import { ProjectDetails } from "./ProjectDetails";
import { useState } from "react";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "on-hold" | "completed";
    progress: number;
    team: string[];
    deadline: string;
    priority: "high" | "medium" | "low";
    category: string;
}

const mockProjects: Project[] = [
    {
        id: "1",
        name: "Website Redesign",
        description: "Complete overhaul of company website with modern UI/UX",
        status: "active",
        progress: 65,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "Mar 15, 2026",
        priority: "high",
        category: "Design"
    },
    {
        id: "2",
        name: "Mobile App Development",
        description: "Native iOS and Android app for customer engagement",
        status: "active",
        progress: 42,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "Apr 30, 2026",
        priority: "high",
        category: "Development"
    },
    {
        id: "3",
        name: "API Integration",
        description: "Third-party API integration for payment processing",
        status: "active",
        progress: 88,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "Feb 28, 2026",
        priority: "medium",
        category: "Development"
    },
    {
        id: "4",
        name: "Database Migration",
        description: "Migrate legacy database to modern cloud infrastructure",
        status: "on-hold",
        progress: 25,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "May 15, 2026",
        priority: "low",
        category: "Infrastructure"
    },
    {
        id: "5",
        name: "Security Audit",
        description: "Comprehensive security review and penetration testing",
        status: "completed",
        progress: 100,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "Jan 31, 2026",
        priority: "high",
        category: "Security"
    },
    {
        id: "6",
        name: "Customer Portal",
        description: "Self-service portal for customer account management",
        status: "active",
        progress: 55,
        team: ["/api/placeholder/32/32", "/api/placeholder/32/32", "/api/placeholder/32/32"],
        deadline: "Mar 30, 2026",
        priority: "medium",
        category: "Product"
    }
];

export const ProjectsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // If a project is selected, show the detail view
    if (selectedProject) {
        return <ProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    const filteredProjects = mockProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "active": return "success";
            case "on-hold": return "warning";
            case "completed": return "default";
            default: return "default";
        }
    };

    const getPriorityColor = (priority: Project["priority"]) => {
        switch (priority) {
            case "high": return "error";
            case "medium": return "warning";
            case "low": return "default";
            default: return "default";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-display-xs sm:text-display-sm font-bold text-gray-900 tracking-tight">Projects</h1>
                    <p className="text-gray-500 text-base sm:text-lg mt-1">Manage and track all your projects</p>
                </div>
                <Button
                    className="gap-2 shadow-lg shadow-brand-500/20 flex-1 sm:flex-none"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-new-project-wizard"))}
                >
                    <Plus className="size-4" /> New Project
                </Button>
            </header>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        aria-label="Search projects"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        aria-label="Filter by status"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                    <FilterSheet
                        trigger={
                            <AriaButton className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors flex items-center gap-2 h-[38px] outline-none">
                                <Filter className="size-4" /> More Filters
                            </AriaButton>
                        }
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <div className="space-y-2">
                                    {["high", "medium", "low"].map((priority) => (
                                        <label key={priority} className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="text-sm text-gray-700 capitalize">{priority}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-sm text-gray-700">1-5 members</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-sm text-gray-700">6-10 members</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-sm text-gray-700">11+ members</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </FilterSheet>
                </div>
            </div>

            {/* Project Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Active Projects</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {mockProjects.filter(p => p.status === "active").length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-success-50 rounded-lg flex items-center justify-center">
                                <TrendingUp className="size-6 text-success-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">On Hold</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {mockProjects.filter(p => p.status === "on-hold").length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-warning-50 rounded-lg flex items-center justify-center">
                                <Calendar className="size-6 text-warning-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {mockProjects.filter(p => p.status === "completed").length}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="size-6 text-gray-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card
                        key={project.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant={getStatusColor(project.status)} size="sm">
                                            {project.status}
                                        </Badge>
                                        <Badge variant={getPriorityColor(project.priority)} size="sm">
                                            {project.priority}
                                        </Badge>
                                    </div>
                                </div>
                                <Button
                                    variant="tertiary"
                                    size="sm"
                                    className="shrink-0"
                                    aria-label="Project options"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle options menu
                                    }}
                                >
                                    <MoreVertical className="size-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} size="sm" variant="brand" />
                            </div>

                            <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Users className="size-4" />
                                    <span>{project.team.length} members</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Calendar className="size-4" />
                                    <span>{project.deadline}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No projects found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};
