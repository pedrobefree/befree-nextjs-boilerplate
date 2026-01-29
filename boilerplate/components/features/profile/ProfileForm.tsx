"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { updateMyProfile, getMyProfile } from "@/app/actions/profiles";

/**
 * ProfileForm Component
 * Demonstration of Server Actions + Form Handling + Loading States.
 * Following patterns from RULES.MD Section 7 (Form Handling).
 */
export function ProfileForm() {
    const { addToast } = useToast();
    const [isPending, setIsPending] = React.useState(false);
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        full_name: "",
        avatar_url: "",
    });

    // Load initial data
    React.useEffect(() => {
        async function loadData() {
            const response = await getMyProfile();
            if (response.success && response.data) {
                setFormData({
                    full_name: response.data.full_name || "",
                    avatar_url: response.data.avatar_url || "",
                });
            }
            setInitialLoading(false);
        }
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Early Validation
        if (formData.full_name.trim().length < 2) {
            addToast({
                title: "Validation Error",
                description: "Full name must be at least 2 characters.",
                type: "error",
            });
            return;
        }

        setIsPending(true);

        try {
            // 2. Server Action call
            const result = await updateMyProfile(formData);

            if (result.success) {
                addToast({
                    title: "Profile Updated",
                    description: "Your changes have been saved successfully.",
                    type: "success",
                });
            } else {
                addToast({
                    title: "Error",
                    description: result.error,
                    type: "error",
                });
            }
        } catch {
            addToast({
                title: "Unexpected Error",
                description: "Something went wrong. Please try again.",
                type: "error",
            });
        } finally {
            setIsPending(false);
        }
    };

    if (initialLoading) {
        return <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
        </div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div className="space-y-4">
                <Input
                    label="Full Name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    required
                    isDisabled={isPending}
                />

                <Input
                    label="Avatar URL"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://..."
                    isDisabled={isPending}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                    type="submit"
                    isDisabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
