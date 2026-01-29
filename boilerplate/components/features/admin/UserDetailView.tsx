"use client";

import { ArrowLeft, Mail, Phone, MapPin, Shield, Clock, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";

interface UserDetailViewProps {
    onBack: () => void;
}

export const UserDetailView = ({ onBack }: UserDetailViewProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm" onClick={onBack} className="p-2 h-9 w-9">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                    <p className="text-sm text-gray-500">View and manage detailed information for this team member.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="pt-8">
                            <div className="flex flex-col items-center text-center">
                                <Avatar
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    size="2xl"
                                    className="mb-4"
                                />
                                <h2 className="text-xl font-bold text-gray-900">Olivia Rhye</h2>
                                <p className="text-sm text-gray-500 mb-4">Product Manager</p>
                                <Badge variant="success">Active</Badge>

                                <div className="w-full border-t border-gray-100 my-6" />

                                <div className="w-full space-y-4 text-left">
                                    <DetailItem icon={Mail} label="Email" value="olivia@untitledui.com" />
                                    <DetailItem icon={Phone} label="Phone" value="+1 (555) 000-0000" />
                                    <DetailItem icon={MapPin} label="Location" value="Melbourne, Australia" />
                                    <DetailItem icon={Clock} label="Timezone" value="AEST (UTC+10)" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Account Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Joined</span>
                                <span className="font-medium text-gray-900">Jan 12, 2023</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Last login</span>
                                <span className="font-medium text-gray-900">2 hours ago</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Role</span>
                                <span className="font-medium text-gray-900">Administrator</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs / Detailed Sections */}
                <div className="lg:col-span-2">
                    <Tabs defaultSelectedKey="activity">
                        <Tabs.List type="underline">
                            <Tabs.Item id="activity">Recent Activity</Tabs.Item>
                            <Tabs.Item id="permissions">Permissions</Tabs.Item>
                            <Tabs.Item id="devices">Active Devices</Tabs.Item>
                        </Tabs.List>

                        <div className="mt-6">
                            <Tabs.Panel id="activity">
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-gray-100">
                                            <ActivityRow
                                                title="Updated billing information"
                                                time="2 hours ago"
                                                type="Billing"
                                            />
                                            <ActivityRow
                                                title="Invited Phoenix Baker to the project"
                                                time="Yesterday at 4:30 PM"
                                                type="Team"
                                            />
                                            <ActivityRow
                                                title="Changed project visibility to 'Public'"
                                                time="3 days ago"
                                                type="Security"
                                            />
                                            <ActivityRow
                                                title="Login from new device (MacBook Pro)"
                                                time="Jan 15, 2024"
                                                type="Login"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Tabs.Panel>

                            <Tabs.Panel id="permissions">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md">Admin Permissions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-gray-500 mb-4">
                                            As an Administrator, this user has full access to the following areas:
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <PermissionItem label="User Management" enabled />
                                            <PermissionItem label="Billing & Subscription" enabled />
                                            <PermissionItem label="API Configuration" enabled />
                                            <PermissionItem label="Advanced Security Settings" enabled />
                                            <PermissionItem label="Project Deletion" enabled />
                                            <PermissionItem label="Audit Log Access" enabled />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Tabs.Panel>

                            <Tabs.Panel id="devices">
                                <div className="space-y-4">
                                    <DeviceItem
                                        name={'MacBook Pro 14"'}
                                        os="macOS Sonoma"
                                        location="Melbourne, Australia"
                                        status="Active Now"
                                        current
                                    />
                                    <DeviceItem
                                        name="iPhone 15 Pro"
                                        os="iOS 17.2"
                                        location="Melbourne, Australia"
                                        status="Last active: 45 mins ago"
                                    />
                                </div>
                            </Tabs.Panel>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-gray-400 shrink-0" />
        <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</span>
            <span className="text-sm text-gray-900 font-medium">{value}</span>
        </div>
    </div>
);

const ActivityRow = ({ title, time, type }: { title: string, time: string, type: string }) => (
    <div className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
        <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
            <Clock className="h-4 w-4 text-brand-600" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{time}</span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs font-medium text-brand-600">{type}</span>
            </div>
        </div>
    </div>
);

const PermissionItem = ({ label, enabled }: { label: string, enabled: boolean }) => (
    <div className="flex items-center gap-2">
        <div className={enabled ? "text-success-500" : "text-gray-300"}>
            <Shield className="h-4 w-4" fill="currentColor" fillOpacity={0.1} />
        </div>
        <span className="text-sm text-gray-700 font-medium">{label}</span>
    </div>
);

const DeviceItem = ({ name, os, location, status, current }: { name: string, os: string, location: string, status: string, current?: boolean }) => (
    <Card className={current ? "border-brand-200 bg-brand-50/10 shadow-sm" : ""}>
        <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{name}</h4>
                        {current && <Badge variant="default" className="text-[10px] h-4">Current session</Badge>}
                    </div>
                    <p className="text-xs text-gray-500">{os} • {location}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={current ? "text-xs font-bold text-brand-600" : "text-xs text-gray-500"}>{status}</span>
                {!current && (
                    <button className="block mt-1 text-[10px] font-bold text-error-700 hover:text-error-800 uppercase tracking-widest">
                        Revoke access
                    </button>
                )}
            </div>
        </CardContent>
    </Card>
);
