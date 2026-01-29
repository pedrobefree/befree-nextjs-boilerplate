"use client";

import { X, Calendar, User, Type, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";
import { useState } from "react";
import { cx } from "@/lib/utils";

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialStatus?: "todo" | "in-progress" | "done";
}

export const CreateTaskModal = ({ isOpen, onClose, initialStatus = "todo" }: CreateTaskModalProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(initialStatus);
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

    const handleSave = () => {
        // In a real app, this would call an API
        console.log("Saving task:", { title, description, status, priority });
        onClose();
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Modal className="sm:max-w-lg">
                <Dialog className="outline-none">
                    <div className="relative">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
                                <p className="text-sm text-gray-500 mt-1">Add a new task to your project</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Type className="size-4 text-gray-400" /> Task Title
                                </label>
                                <Input
                                    placeholder="e.g. Design new landing page"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <AlignLeft className="size-4 text-gray-400" /> Description
                                </label>
                                <TextArea
                                    placeholder="What needs to be done?"
                                    value={description}
                                    onChange={setDescription}
                                    className="min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus((e.target as HTMLSelectElement).value as any)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        Priority
                                    </label>
                                    <div className="flex gap-2">
                                        {(["low", "medium", "high"] as const).map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => setPriority(p)}
                                                className={cx(
                                                    "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border",
                                                    priority === p
                                                        ? p === "high" ? "bg-error-50 border-error-200 text-error-700 ring-2 ring-error-500/20"
                                                            : p === "medium" ? "bg-warning-50 border-warning-200 text-warning-700 ring-2 ring-warning-500/20"
                                                                : "bg-gray-50 border-gray-200 text-gray-700 ring-2 ring-gray-200"
                                                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                                                )}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Calendar className="size-4 text-gray-400" /> Due Date
                                    </label>
                                    <Input type="date" className="h-10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <User className="size-4 text-gray-400" /> Assignee
                                    </label>
                                    <Input placeholder="Search member..." className="h-10" />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleSave} isDisabled={!title.trim()}>Create Task</Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
