"use client";

import { X, Clock, User, AlignLeft, MessageSquare, History, Tag, Flag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { TextArea } from "@/components/ui/Textarea";

interface Task {
    id: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string;
    assignee: string;
    description?: string;
    notes?: string;
}

interface TaskModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
}

export const TaskModal = ({ task, isOpen, onClose }: TaskModalProps) => {
    if (!task) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Modal className="sm:max-w-2xl">
                <Dialog className="outline-none">
                    <div className="relative">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 pr-16">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge
                                    variant={task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "default"}
                                    className="capitalize"
                                >
                                    {task.priority} Priority
                                </Badge>
                                <Badge variant={task.status === "done" ? "success" : "default"}>
                                    {task.status === "in-progress" ? "In Progress" : task.status === "todo" ? "To Do" : "Done"}
                                </Badge>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>

                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <User className="size-3" /> Assignee
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Avatar src={task.assignee} size="sm" />
                                        <span className="text-sm font-medium text-gray-700">Olivia Rhye</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <Clock className="size-3" /> Due Date
                                    </label>
                                    <span className="text-sm font-medium text-gray-700">{task.dueDate}, 2026</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <AlignLeft className="size-4 text-gray-400" /> Description
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    This task involves reviewing all current UI tokens and ensuring they align with the new design system guidelines.
                                    We need to check specifically for contrast ratios and consistent naming conventions across all components.
                                </p>
                            </div>

                            {/* Notes */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <MessageSquare className="size-4 text-gray-400" /> Task Notes
                                </h3>
                                <TextArea
                                    placeholder="Add a note or update..."
                                    defaultValue={task.notes}
                                    className="min-h-[100px] text-sm resize-none"
                                />
                                <div className="flex justify-end">
                                    <Button size="sm">Save Note</Button>
                                </div>
                            </div>

                            {/* Activity */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <History className="size-4 text-gray-400" /> Recent Activity
                                </h3>
                                <div className="space-y-4">
                                    <ActivityItem
                                        user="Olivia Rhye"
                                        action="moved this task to"
                                        target="In Progress"
                                        time="2 hours ago"
                                    />
                                    <ActivityItem
                                        user="Phoenix Baker"
                                        action="changed priority to"
                                        target="High"
                                        time="5 hours ago"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant="tertiary" size="sm" className="gap-2">
                                    <Tag className="size-4" /> Labels
                                </Button>
                                <Button variant="tertiary" size="sm" className="gap-2">
                                    <Flag className="size-4" /> Priority
                                </Button>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
                                <Button size="sm">Complete Task</Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};

const ActivityItem = ({ user, action, target, time }: any) => (
    <div className="flex gap-3">
        <Avatar size="xs" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
        <div className="text-xs">
            <p className="text-gray-900">
                <span className="font-bold">{user}</span> {action} <span className="font-bold text-brand-700">{target}</span>
            </p>
            <p className="text-gray-500 mt-1">{time}</p>
        </div>
    </div>
);
