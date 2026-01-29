"use client";

import { useState } from "react";
import { X, Users, Check } from "lucide-react";
import { Dialog, Modal, ModalOverlay } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cx } from "@/lib/utils";

interface InviteMemberModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onInvite: (email: string, role: string) => void;
}

export const InviteMemberModal = ({ isOpen, onOpenChange, onInvite }: InviteMemberModalProps) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onInvite(email, role);
        setIsSent(true);
        setTimeout(() => {
            onOpenChange(false);
            setIsSent(false);
            setEmail("");
            setRole("viewer");
        }, 2000);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
            <Modal className="max-w-md w-full p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                <Dialog className="outline-hidden">
                    <div className="flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-50 rounded-lg">
                                    <Users className="size-5 text-brand-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Invite team member</h3>
                            </div>
                            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {isSent ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="size-16 bg-success-50 rounded-full flex items-center justify-center mx-auto scale-110 transition-transform">
                                        <Check className="size-8 text-success-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-gray-900">Invitation sent!</h4>
                                        <p className="text-sm text-gray-500">We've sent an invite to <span className="font-semibold text-gray-900">{email}</span></p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Input
                                        label="Email address"
                                        placeholder="olivia@untitledui.com"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Select Role</label>
                                        <div className="grid gap-3">
                                            <RoleOption
                                                id="admin"
                                                title="Administrator"
                                                description="Full access to settings and billing."
                                                selected={role === "admin"}
                                                onSelect={() => setRole("admin")}
                                            />
                                            <RoleOption
                                                id="editor"
                                                title="Editor"
                                                description="Can edit projects and content."
                                                selected={role === "editor"}
                                                onSelect={() => setRole("editor")}
                                            />
                                            <RoleOption
                                                id="viewer"
                                                title="Viewer"
                                                description="Read-only access to the workspace."
                                                selected={role === "viewer"}
                                                onSelect={() => setRole("viewer")}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
                                            Cancel
                                        </Button>
                                        <Button className="flex-1" type="submit">
                                            Send Invitation
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};

const RoleOption = ({ title, description, selected, onSelect }: any) => (
    <button
        type="button"
        onClick={onSelect}
        className={cx(
            "flex items-start gap-3 p-3 rounded-xl border text-left transition-all",
            selected ? "bg-brand-50/50 border-brand-600 ring-1 ring-brand-600" : "bg-white border-gray-200 hover:border-brand-300"
        )}
    >
        <div className={cx(
            "size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
            selected ? "border-brand-600 bg-brand-600 text-white" : "border-gray-200"
        )}>
            {selected && <div className="size-2 rounded-full bg-white" />}
        </div>
        <div className="space-y-0.5">
            <p className={cx("text-sm font-bold", selected ? "text-brand-900" : "text-gray-900")}>{title}</p>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </button>
);
