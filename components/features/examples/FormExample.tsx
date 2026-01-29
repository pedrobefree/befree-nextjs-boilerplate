"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

/**
 * Example of a form implementation with basic validation.
 */
export function FormExample() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6 text-center space-y-4">
                    <div className="size-12 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto">
                        ✓
                    </div>
                    <CardTitle>Submission Successful!</CardTitle>
                    <p className="text-gray-500">Your details have been registered correctly.</p>
                    <Button variant="secondary" onClick={() => setIsSuccess(false)}>Reset Form</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>User Registration</CardTitle>
                <CardDescription>Example form showing validation patterns.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="Olivia Rhye"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="olivia@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" isDisabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Create Account"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
