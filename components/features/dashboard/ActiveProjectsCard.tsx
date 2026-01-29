"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";

const projects = [
    {
        id: "1",
        name: "Q1 Marketing Launch",
        status: "in-progress",
        progress: 68,
        team: ["JD", "OR", "PB"],
        category: "Marketing"
    },
    {
        id: "2",
        name: "Security Audit v2",
        status: "planning",
        progress: 15,
        team: ["DW", "LS"],
        category: "Security"
    },
    {
        id: "3",
        name: "Design System Migration",
        status: "on-hold",
        progress: 85,
        team: ["OR", "CW"],
        category: "Design"
    }
];

export const ActiveProjectsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Currently tracked initiatives.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                    {projects.map((project) => (
                        <div key={project.id} className="p-4 hover:bg-gray-50/50 transition-colors space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-gray-900">{project.name}</p>
                                    <p className="text-xs text-gray-500">{project.category}</p>
                                </div>
                                <Badge variant={
                                    project.status === "in-progress" ? "brand" :
                                        project.status === "planning" ? "default" :
                                            "warning"
                                } size="sm">
                                    {project.status === "in-progress" ? "Active" :
                                        project.status === "planning" ? "Planning" : "On Hold"}
                                </Badge>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex -space-x-1.5">
                                        {project.team.map((initials, i) => (
                                            <Avatar key={i} initials={initials} size="xs" className="ring-2 ring-white" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-gray-700">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} size="sm" variant="brand" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
