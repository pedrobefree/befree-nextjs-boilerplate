"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Toggle } from "@/components/ui/Toggle";

export const NotificationsSettingsPage = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-gray-900">Email notifications</label>
                                <p className="text-sm text-gray-500">Receive emails about your account activity.</p>
                            </div>
                            <Toggle defaultSelected>On</Toggle>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">News and updates</h3>
                        <div className="space-y-3">
                            <Checkbox defaultSelected>News about product and feature updates</Checkbox>
                            <Checkbox defaultSelected>Tips on getting more out of Untitled UI</Checkbox>
                            <Checkbox>Things you missed since you last logged in</Checkbox>
                            <Checkbox>News about our latest products and feature updates</Checkbox>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-900">Push notifications</h3>
                        <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-brand-600 focus:ring-brand-600" defaultChecked />
                                <label htmlFor="push-everything" className="text-sm text-gray-900">Everything</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-brand-600 focus:ring-brand-600" />
                                <label htmlFor="push-email" className="text-sm text-gray-900">Same as email</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-brand-600 focus:ring-brand-600" />
                                <label htmlFor="push-nothing" className="text-sm text-gray-900">No push notifications</label>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                    <Button variant="secondary">Cancel</Button>
                    <Button>Save preferences</Button>
                </CardFooter>
            </Card>
        </div>
    );
};
