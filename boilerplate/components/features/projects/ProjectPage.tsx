"use client";

import { useState } from "react";
import { ProjectDashboard } from "./ProjectDashboard";
import { ProjectDetails } from "./ProjectDetails";
import { CreateProjectWizard } from "./CreateProjectWizard";

export const ProjectPage = () => {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className="max-w-5xl mx-auto py-8">
                <CreateProjectWizard
                    onClose={() => setIsCreating(false)}
                    onComplete={() => setIsCreating(false)}
                />
            </div>
        );
    }

    if (selectedProject) {
        return (
            <ProjectDetails
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
            />
        );
    }

    return (
        <ProjectDashboard
            onCreateClick={() => setIsCreating(true)}
            onProjectClick={setSelectedProject}
        />
    );
};
