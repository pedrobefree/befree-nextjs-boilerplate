"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { cx } from "@/lib/utils";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: string;
        name: string;
        description: string;
        status: string;
    };
    onSave: (data: any) => void;
}

export const EditProjectModal = ({ isOpen, onClose, project, onSave }: EditProjectModalProps) => {
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        status: project.status
    });

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Modal>
                <Dialog className="outline-none">
                    {({ close }) => (
                        <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
                                <p className="text-sm text-gray-500">Update project details and status.</p>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Project Name</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Website Redesign"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Description</label>
                                    <TextArea
                                        value={formData.description}
                                        onChange={(val) => setFormData({ ...formData, description: val })}
                                        rows={3}
                                        placeholder="Briefly describe the project goals..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Status</label>
                                    <div className="flex gap-2">
                                        {["active", "on-hold", "completed"].map((status) => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, status })}
                                                className={cx(
                                                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2",
                                                    formData.status === status
                                                        ? "border-brand-600 bg-brand-50 text-brand-700"
                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                )}
                                            >
                                                <span className="capitalize">{status}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                                <Button variant="tertiary" onClick={close}>Cancel</Button>
                                <Button onClick={handleSave}>Save Changes</Button>
                            </div>
                        </div>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
