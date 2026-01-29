"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Target, Calendar, Users, Rocket, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { cx } from "@/lib/utils";

interface CreateProjectWizardProps {
    onClose: () => void;
    onComplete: (data: any) => void;
}

export const CreateProjectWizard = ({ onClose, onComplete }: CreateProjectWizardProps) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        goal: "",
        deadline: "",
        visibility: "team"
    });

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else onComplete(formData);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-[600px] flex flex-col lg:flex-row bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Sidebar */}
            <div className="w-full lg:w-72 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-8">
                <div className="flex items-center gap-2 mb-10 text-brand-700">
                    <Rocket className="size-6 shrink-0" />
                    <span className="font-bold text-lg">New Project</span>
                </div>

                <nav className="space-y-6">
                    <WizardStep
                        number={1}
                        title="Project Details"
                        description="Name and purpose"
                        active={step === 1}
                        completed={step > 1}
                    />
                    <WizardStep
                        number={2}
                        title="Timeline & Goals"
                        description="Milestones and dates"
                        active={step === 2}
                        completed={step > 2}
                    />
                    <WizardStep
                        number={3}
                        title="Team Access"
                        description="Members and roles"
                        active={step === 3}
                        completed={step > 3}
                    />
                </nav>

                <div className="mt-auto pt-10 hidden lg:block">
                    <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 flex gap-3">
                        <Info className="size-5 text-brand-600 shrink-0" />
                        <p className="text-xs text-brand-800 leading-relaxed font-medium">
                            Projects can be migrated between workspaces later if needed.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="p-8 lg:p-12 flex-1 scrollbar-hide overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
                                <p className="text-gray-500">Every great project needs a clear identity and a compelling description.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Project Name</label>
                                    <Input
                                        placeholder="e.g. Q3 Marketing Sprint"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Description</label>
                                    <TextArea
                                        placeholder="What are you building? Keep it brief but descriptive."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(val) => setFormData({ ...formData, description: val })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals and timeline</h2>
                                <p className="text-gray-500">Define what success looks like and set your target date.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-full">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Target className="size-4 text-brand-600" /> Key Objective
                                    </label>
                                    <Input
                                        placeholder="e.g. Increase conversion by 15%"
                                        value={formData.goal}
                                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Calendar className="size-4 text-brand-600" /> Deadline
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Who has access?</h2>
                                <p className="text-gray-500">Set the initial permissions for this project. You can add more people later.</p>
                            </div>

                            <div className="space-y-4">
                                <VisibilityOption
                                    icon={Users}
                                    title="Team-wide"
                                    description="Available to everyone in your current workspace."
                                    selected={formData.visibility === "team"}
                                    onClick={() => setFormData({ ...formData, visibility: "team" })}
                                />
                                <VisibilityOption
                                    icon={Check}
                                    title="Private"
                                    description="Only specific members invited by you can see this."
                                    selected={formData.visibility === "private"}
                                    onClick={() => setFormData({ ...formData, visibility: "private" })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-gray-100 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-sm">
                    <Button variant="tertiary" onClick={onClose}>Cancel</Button>
                    <div className="flex gap-3">
                        {step > 1 && (
                            <Button variant="secondary" onClick={handleBack} className="gap-2">
                                <ArrowLeft className="size-4" /> Back
                            </Button>
                        )}
                        <Button onClick={handleNext} className="gap-2 min-w-[120px]">
                            {step === totalSteps ? "Create Project" : "Next step"}
                            {step < totalSteps && <ArrowRight className="size-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WizardStep = ({ number, title, description, active, completed }: { number: number, title: string, description: string, active: boolean, completed: boolean }) => (
    <div className="flex items-start gap-4">
        <div className={cx(
            "size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 transition-all duration-300",
            active ? "bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-200" :
                completed ? "bg-brand-50 border-brand-600 text-brand-600" :
                    "bg-white border-gray-200 text-gray-400"
        )}>
            {completed ? <Check className="size-4" /> : number}
        </div>
        <div className="flex flex-col gap-0.5">
            <span className={cx("text-sm font-bold transition-colors", active ? "text-gray-900" : "text-gray-500")}>{title}</span>
            <span className="text-xs text-gray-400">{description}</span>
        </div>
    </div>
);

const VisibilityOption = ({ icon: Icon, title, description, selected, onClick }: { icon: any, title: string, description: string, selected: boolean, onClick: () => void }) => (
    <Card
        className={cx(
            "cursor-pointer transition-all border-2",
            selected ? "border-brand-600 bg-brand-50/20" : "border-gray-100 hover:border-gray-300"
        )}
        onClick={onClick}
    >
        <CardContent className="p-4 flex items-center gap-4">
            <div className={cx(
                "size-10 rounded-lg flex items-center justify-center",
                selected ? "bg-brand-100 text-brand-600" : "bg-gray-100 text-gray-400"
            )}>
                <Icon className="size-5" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            {selected && (
                <div className="size-5 rounded-full bg-brand-600 flex items-center justify-center text-white shrink-0">
                    <Check className="size-3.5 font-black" />
                </div>
            )}
        </CardContent>
    </Card>
);
