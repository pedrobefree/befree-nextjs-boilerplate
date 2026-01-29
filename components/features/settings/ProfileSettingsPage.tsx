"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/Textarea";

export const ProfileSettingsPage = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <Avatar
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Olivia Rhye"
                            size="xl"
                        />
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm">Change avatar</Button>
                                <Button variant="tertiary" size="sm" className="text-error-700 hover:text-error-800">
                                    Delete
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Input label="First name" defaultValue="Olivia" />
                        <Input label="Last name" defaultValue="Rhye" />
                    </div>

                    <Input
                        label="Email address"
                        type="email"
                        defaultValue="olivia@untitledui.com"
                    />

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Bio</label>
                        <TextArea
                            placeholder="Write a short introduction..."
                            defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                            rows={4}
                        />
                        <p className="text-xs text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <Button variant="secondary">Cancel</Button>
                    <Button>Save changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
