"use client";

import { X, User, Mail, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";

interface Member {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member" | "viewer";
    status: "active" | "inactive" | "pending";
    avatar: string;
}

interface EditMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: Member | null;
}

export const EditMemberModal = ({ isOpen, onClose, member }: EditMemberModalProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<Member["role"]>("member");
    const [status, setStatus] = useState<Member["status"]>("active");

    useEffect(() => {
        if (member) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(member.name);
            setEmail(member.email);
            setRole(member.role);
            setStatus(member.status);
        }
    }, [member]);

    const handleSave = () => {
        // In a real app, this would call an API
        console.log("Saving member changes:", { id: member?.id, name, email, role, status });
        onClose();
    };

    if (!member) return null;

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Modal className="sm:max-w-lg">
                <Dialog className="outline-none">
                    <div className="relative">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Edit Team Member</h2>
                            <p className="text-sm text-gray-500 mt-1">Update member details and permissions</p>
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <User className="size-4 text-gray-400" /> Full Name
                                    </label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Mail className="size-4 text-gray-400" /> Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Shield className="size-4 text-gray-400" /> Role
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole((e.target as HTMLSelectElement).value as any)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 h-10"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Activity className="size-4 text-gray-400" /> Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus((e.target as HTMLSelectElement).value as any)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 h-10"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleSave} isDisabled={!name.trim() || !email.trim()}>Save Changes</Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
