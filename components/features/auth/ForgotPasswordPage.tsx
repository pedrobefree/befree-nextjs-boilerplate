"use client";

import React, { useState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { UntitledUiLogo } from "@/components/ui/logos";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

export const ForgotPasswordPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const supabase = createClient();

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });

            if (error) throw error;

            setIsSubmitted(true);
            addToast({
                title: "Email sent",
                description: "Check your inbox for password reset instructions.",
                type: "success"
            });
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error.message || "Failed to send reset email.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <UntitledUiLogo className="h-10 w-auto" />
                    </div>
                    <div className="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                            <KeyRound className="h-6 w-6 text-success-600" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Check your email</h2>
                        <p className="mt-2 text-sm text-gray-600 mb-8">
                            We sent a password reset link to <span className="font-medium text-gray-900">{email}</span>.
                        </p>
                        <Button className="w-full justify-center" onPress={() => window.open("mailto:")}>
                            Open email app
                        </Button>
                        <div className="mt-6 flex justify-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive the email?{" "}
                                <button type="button" className="font-medium text-brand-600 hover:text-brand-500" onClick={() => setIsSubmitted(false)}>
                                    Click to resend
                                </button>
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <a href="/login" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-500">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <UntitledUiLogo className="h-10 w-auto" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot password?</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    No worries, we'll send you reset instructions.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div>
                            <Button type="submit" className="w-full justify-center" isDisabled={isLoading}>
                                {isLoading ? "Sending..." : "Reset password"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 flex justify-center">
                        <a href="/login" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-500">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
