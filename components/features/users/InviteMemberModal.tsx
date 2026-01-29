"use client";

import { X, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { cx } from "@/lib/utils";

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InviteMemberModal = ({ isOpen, onClose }: InviteMemberModalProps) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"admin" | "member" | "viewer">("member");

    const handleInvite = () => {
        // In a real app, this would call an API
        console.log("Inviting member:", { email, role });
        onClose();
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Modal className="sm:max-w-md">
                <Dialog className="outline-none">
                    <div className="relative">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Invite Team Member</h2>
                            <p className="text-sm text-gray-500 mt-1">Send an invitation to join your workspace</p>
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Mail className="size-4 text-gray-400" /> Email Address
                                </label>
                                <Input
                                    type="email"
                                    placeholder="olivia@untitledui.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Shield className="size-4 text-gray-400" /> Role
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: "admin", title: "Admin", desc: "Can manage all settings and members" },
                                        { id: "member", title: "Member", desc: "Can view and edit most resources" },
                                        { id: "viewer", title: "Viewer", desc: "Can only view resources" }
                                    ].map((r) => (
                                        <button
                                            key={r.id}
                                            onClick={() => setRole(r.id as any)}
                                            className={cx(
                                                "flex items-start gap-3 p-3 rounded-lg border transition-all text-left",
                                                role === r.id
                                                    ? "bg-brand-50 border-brand-200 ring-2 ring-brand-500/10"
                                                    : "bg-white border-gray-100 hover:border-gray-200"
                                            )}
                                        >
                                            <div className={cx(
                                                "size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0",
                                                role === r.id ? "border-brand-600 bg-brand-600" : "border-gray-200"
                                            )}>
                                                {role === r.id && <div className="size-1.5 rounded-full bg-white" />}
                                            </div>
                                            <div>
                                                <p className={cx("text-sm font-bold", role === r.id ? "text-brand-900" : "text-gray-900")}>{r.title}</p>
                                                <p className="text-xs text-gray-500">{r.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleInvite} isDisabled={!email.trim() || !email.includes("@")}>Send Invitation</Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
