"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { UntitledUiLogo } from "@/components/ui/logos";
import { SocialIcon } from "@/components/ui/social-icons";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (signInError) throw signInError;

            addToast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
                type: "success",
            });

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            const errorMessage = err.message || "Invalid email or password.";
            setError(errorMessage);
            addToast({
                title: "Login failed",
                description: errorMessage,
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Section - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <UntitledUiLogo className="h-8 w-auto text-brand-600" />
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or{" "}
                            <a href="/signup" className="font-medium text-brand-600 hover:text-brand-500">
                                start your 14-day free trial
                            </a>
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            {error && (
                                <div className="mb-4 rounded-md bg-red-50 p-4">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                                <Input
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="flex items-center justify-between">
                                    <Checkbox
                                        size="sm"
                                        name="remember"
                                        isSelected={formData.remember}
                                        onChange={(isSelected) => setFormData(prev => ({ ...prev, remember: isSelected }))}
                                        label="Remember for 30 days"
                                    />
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full justify-center"
                                        isDisabled={isLoading}
                                    >
                                        {isLoading ? "Signing in..." : "Sign in"}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-4 text-center text-sm">
                                <Link href="/forgot-password" className="font-medium text-brand-600 hover:text-brand-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">Or sign in with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <Button variant="secondary" className="w-full justify-center" onClick={() => handleSocialLogin('google')}>
                                        <SocialIcon type="google" className="h-5 w-5" />
                                        <span className="sr-only">Sign in with Google</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button variant="secondary" className="w-full justify-center" onClick={() => handleSocialLogin('facebook')}>
                                        <SocialIcon type="facebook" className="h-5 w-5" />
                                        <span className="sr-only">Sign in with Facebook</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button variant="secondary" className="w-full justify-center" onClick={() => handleSocialLogin('twitter')}>
                                        <SocialIcon type="twitter" className="h-5 w-5" />
                                        <span className="sr-only">Sign in with Twitter</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image/Branding */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt="Office background"
                />
                <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply" />
            </div>
        </div>
    );
};
