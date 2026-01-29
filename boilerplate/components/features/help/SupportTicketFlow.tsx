"use client";

import { useState } from "react";
import { MessageCircle, Send, Plus, Paperclip, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Modal, ModalOverlay, Dialog } from "@/components/ui/Modal";
import { cx } from "@/lib/utils";

export const SupportTicketFlow = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [category, setCategory] = useState("technical");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => setStatus("success"), 1500);
    };

    const reset = () => {
        setIsModalOpen(false);
        setStatus("idle");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 className="text-display-xs font-bold text-gray-900">Support & Feedback</h1>
                    <p className="text-gray-500">Need help or have a feature suggestion? Let our team know.</p>
                </div>
                <Button className="gap-2 shadow-lg hover:shadow-none transition-shadow" onClick={() => setIsModalOpen(true)}>
                    <Plus className="size-4" /> New Ticket
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="hover:border-brand-300 transition-colors">
                    <CardHeader>
                        <div className="size-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-2">
                            <MessageCircle className="size-6 text-brand-600" />
                        </div>
                        <CardTitle>Direct Support</CardTitle>
                        <CardDescription>Open a ticket with our technical support team for help with any issues.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <div className="size-2 bg-success-500 rounded-full animate-pulse" />
                            Average response time: &lt; 2 hours
                        </div>
                        <Button variant="secondary" className="w-full" onClick={() => setIsModalOpen(true)}>Open Technical Ticket</Button>
                    </CardContent>
                </Card>

                <Card className="hover:border-brand-300 transition-colors">
                    <CardHeader>
                        <div className="size-12 bg-success-50 rounded-2xl flex items-center justify-center mb-2">
                            <AlertCircle className="size-6 text-success-600" />
                        </div>
                        <CardTitle>Share Feedback</CardTitle>
                        <CardDescription>Help us improve by sharing your thoughts, feature requests, or bugs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <span className="font-semibold text-gray-900">12</span> requests implemented this month
                        </div>
                        <Button variant="secondary" className="w-full" onClick={() => setIsModalOpen(true)}>Submit Feedback</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Ticket Submission Modal */}
            <ModalOverlay isOpen={isModalOpen} onOpenChange={setIsModalOpen} isDismissable>
                <Modal className="max-w-xl w-full p-0 overflow-hidden shadow-2xl border-none">
                    <Dialog className="outline-hidden">
                        <div className="bg-white rounded-3xl overflow-hidden">
                            {status === "success" ? (
                                <div className="p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
                                    <div className="size-20 bg-success-50 rounded-full flex items-center justify-center mx-auto border-4 border-success-100">
                                        <CheckCircle2 className="size-10 text-success-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-gray-900">Ticket Submitted</h3>
                                        <p className="text-gray-500">Thank you for reaching out! Our team has received your ticket (#TK-4912) and will get back to you shortly.</p>
                                    </div>
                                    <Button className="w-full h-12 text-lg" onClick={reset}>Got it, thanks!</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col">
                                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold text-gray-900">Create Support Ticket</h3>
                                            <p className="text-sm text-gray-500">Provide as much detail as possible for a faster resolution.</p>
                                        </div>
                                        <Button variant="tertiary" size="sm" className="p-1 h-8 w-8" onClick={reset}>
                                            <X className="size-5 text-gray-400" />
                                        </Button>
                                    </div>

                                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-gray-700">Category</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <CategoryBtn active={category === "technical"} label="Technical Issue" onClick={() => setCategory("technical")} />
                                                <CategoryBtn active={category === "billing"} label="Billing/Account" onClick={() => setCategory("billing")} />
                                                <CategoryBtn active={category === "feedback"} label="Product Feedback" onClick={() => setCategory("feedback")} />
                                                <CategoryBtn active={category === "other"} label="Other" onClick={() => setCategory("other")} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Subject</label>
                                            <Input placeholder="Brief overview of the issue" className="h-11" required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Description</label>
                                            <TextArea placeholder="Tell us more about what's happening..." rows={4} isRequired />
                                        </div>

                                        <div className="p-4 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center py-8 group hover:border-brand-200 transition-colors cursor-pointer">
                                            <Paperclip className="size-8 text-gray-300 group-hover:text-brand-500 mb-2 transition-colors" />
                                            <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">Attach screenshots or logs</span>
                                            <span className="text-xs text-gray-400">Max size 10MB</span>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                                        <Button variant="tertiary" type="button" onClick={reset}>Cancel</Button>
                                        <Button type="submit" className="gap-2 min-w-[140px]" isDisabled={status === "submitting"}>
                                            {status === "submitting" ? "Submitting..." : <><Send className="size-4" /> Send Ticket</>}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
};

const CategoryBtn = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
    <button
        type="button"
        onClick={onClick}
        className={cx(
            "px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all",
            active ? "border-brand-600 bg-brand-50 text-brand-700 shadow-sm" : "border-gray-100 text-gray-600 hover:border-gray-200"
        )}
    >
        {label}
    </button>
);
