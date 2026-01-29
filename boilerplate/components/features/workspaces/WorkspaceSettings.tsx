"use client";

import { useState } from "react";
import { UserPlus, Trash2, Globe, Copy, Check, Slack, Github, Figma, CreditCard, ExternalLink, Plus, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Toggle } from "@/components/ui/Toggle";
import { cx } from "@/lib/utils";

export const WorkspaceSettings = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("https://app.untitledui.com/join/team-abc-123");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-display-xs font-bold text-gray-900">Workspace Settings</h1>
                <p className="text-gray-500">Manage your team's configuration, members, and integration settings.</p>
            </div>

            <Tabs defaultSelectedKey="general">
                <Tabs.List type="underline">
                    <Tabs.Item id="general">General</Tabs.Item>
                    <Tabs.Item id="members">Members & Roles</Tabs.Item>
                    <Tabs.Item id="integrations">Integrations</Tabs.Item>
                    <Tabs.Item id="billing">Billing</Tabs.Item>
                </Tabs.List>

                <div className="mt-8">
                    <Tabs.Panel id="general">
                        <div className="max-w-3xl space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Workspace Profile</CardTitle>
                                    <CardDescription>Update your workspace name, logo, and public URL.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                                        <div className="relative group">
                                            <Avatar
                                                src="https://images.unsplash.com/photo-1599305090598-fe179d501c27"
                                                size="2xl"
                                                className="border-2 border-gray-100"
                                            />
                                            <button className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold uppercase tracking-widest">
                                                Change
                                            </button>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Workspace name</label>
                                                <Input defaultValue="Untitled UI Team" className="max-w-md h-10" />
                                            </div>
                                            <div className="space-y-2 text-left">
                                                <Input
                                                    label="Organization URL"
                                                    prefix="untitledui.com/"
                                                    defaultValue="untitledui"
                                                    containerClassName="max-w-md"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <Button>Save changes</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-error-200 bg-error-25/30">
                                <CardHeader>
                                    <CardTitle className="text-error-900">Danger Zone</CardTitle>
                                    <CardDescription className="text-error-700">Permanently delete this workspace and all associated data.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="destructive" className="bg-error-600 hover:bg-error-700">Delete workspace</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="members">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Invite members</CardTitle>
                                            <CardDescription>Invite new members to your workspace to start collaborating.</CardDescription>
                                        </div>
                                        <Button className="gap-2">
                                            <UserPlus className="size-4" /> Invite by email
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                                <Globe className="size-6 text-brand-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Workspace share link</h4>
                                                <p className="text-sm text-gray-500">Anyone with this link can request to join.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg pl-4 pr-1 py-1">
                                            <span className="text-sm text-gray-600 font-medium truncate max-w-[200px]">...join/team-abc-123</span>
                                            <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-2 shrink-0 h-8">
                                                {copied ? <Check className="size-3.5 text-success-600" /> : <Copy className="size-3.5" />}
                                                {copied ? "Copied" : "Copy link"}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        <MemberRow
                                            name="Olivia Rhye"
                                            email="olivia@untitledui.com"
                                            role="Admin"
                                            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                                            isOwner
                                        />
                                        <MemberRow
                                            name="Phoenix Baker"
                                            email="phoenix@untitledui.com"
                                            role="Editor"
                                            avatar="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5"
                                        />
                                        <MemberRow
                                            name="Lana Steiner"
                                            email="lana@untitledui.com"
                                            role="Viewer"
                                            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel id="integrations">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Integrations</h3>
                                <p className="text-gray-500">Connect your favorite tools to automate your workflow.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <IntegrationCard
                                    name="Slack"
                                    description="Send notifications to your team's Slack channels."
                                    icon={Slack}
                                    connected
                                />
                                <IntegrationCard
                                    name="GitHub"
                                    description="Sync your workspace projects with GitHub repositories."
                                    icon={Github}
                                    connected
                                />
                                <IntegrationCard
                                    name="Figma"
                                    description="Embed Figma files directly into your project documents."
                                    icon={Figma}
                                />
                                <IntegrationCard
                                    name="Zapier"
                                    description="Build custom automations between your favorite apps."
                                    icon={Zap}
                                />
                                <IntegrationCard
                                    name="Intercom"
                                    description="Connect to your Intercom account to support your users."
                                    icon={MessageSquare}
                                />
                            </div>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel id="billing">
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Current Plan</CardTitle>
                                                    <CardDescription>You are currently on the <span className="font-bold text-gray-900">Pro Business</span> plan.</CardDescription>
                                                </div>
                                                <Badge variant="brand" size="lg">Active</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-gray-900">$49</span>
                                                <span className="text-gray-500">per month</span>
                                            </div>
                                            <div className="flex items-center gap-4 pt-4">
                                                <Button>Change Plan</Button>
                                                <Button variant="secondary">Cancel Subscription</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Payment Method</CardTitle>
                                                    <CardDescription>Update your billing information and payment methods.</CardDescription>
                                                </div>
                                                <Button variant="tertiary" size="sm" className="gap-2">
                                                    <Plus className="size-4" /> Add card
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-2">
                                                        <CreditCard className="size-full text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">Visa ending in 4242</p>
                                                        <p className="text-xs text-gray-500">Expiry 12/26</p>
                                                    </div>
                                                </div>
                                                <Button variant="tertiary" size="sm">Edit</Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-gray-900">Billing History</h4>
                                        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Invoice</TableHead>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Amount</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead className="text-right sr-only">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        { id: "INV-001", date: "Jan 15, 2026", amount: "$49.00", status: "Paid" },
                                                        { id: "INV-002", date: "Dec 15, 2025", amount: "$49.00", status: "Paid" },
                                                        { id: "INV-003", date: "Nov 15, 2025", amount: "$49.00", status: "Paid" },
                                                    ].map((invoice) => (
                                                        <TableRow key={invoice.id}>
                                                            <TableCell className="font-medium">{invoice.id}</TableCell>
                                                            <TableCell>{invoice.date}</TableCell>
                                                            <TableCell>{invoice.amount}</TableCell>
                                                            <TableCell><Badge variant="success" size="sm">{invoice.status}</Badge></TableCell>
                                                            <TableCell className="text-right">
                                                                <Button variant="tertiary" size="sm">Download</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Card className="bg-brand-900 text-white border-none space-y-4 p-6">
                                        <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Zap className="size-5 text-brand-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-lg">Need more power?</h4>
                                            <p className="text-brand-200 text-sm leading-relaxed">Upgrade to our Enterprise plan for unlimited projects, advanced security, and priority support.</p>
                                        </div>
                                        <Button className="w-full bg-white text-brand-900 hover:bg-brand-50 border-none transition-transform hover:-translate-y-1">Upgrade Now</Button>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-sm">Billing Email</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-sm">
                                            <p className="text-gray-500">Invoices will be sent to:</p>
                                            <p className="font-bold text-gray-900">olivia@untitledui.com</p>
                                            <Button variant="secondary" className="w-full">Update email</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Tabs.Panel>
                </div>
            </Tabs>
        </div>
    );
};

const MemberRow = ({ name, email, role, avatar, isOwner }: { name: string, email: string, role: string, avatar: string, isOwner?: boolean }) => (
    <div className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Avatar src={avatar} size="md" alt={name} />
            <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{name} {isOwner && <Badge variant="default" size="sm" className="ml-1 scale-90">Owner</Badge>}</span>
                <span className="text-sm text-gray-500">{email}</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-gray-50 border-gray-200 text-gray-600">{role}</Badge>
            <Button variant="tertiary" size="sm" className="p-2 h-9 w-9 text-gray-400 hover:text-error-700">
                <Trash2 className="size-4" />
            </Button>
        </div>
    </div>
);

const IntegrationCard = ({ name, description, icon: Icon, connected }: { name: string, description: string, icon: any, connected?: boolean }) => (
    <Card className={cx("group transition-all hover:border-brand-300", connected && "bg-brand-25/30 border-brand-100")}>
        <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className={cx(
                    "size-12 rounded-xl flex items-center justify-center border transition-colors",
                    connected ? "bg-white border-brand-200 text-brand-600" : "bg-gray-50 border-gray-100 text-gray-400 group-hover:border-gray-200"
                )}>
                    <Icon className="size-6" />
                </div>
                <Toggle isSelected={connected} aria-label={`Toggle ${name}`} />
            </div>
            <div className="space-y-1">
                <h4 className="font-bold text-gray-900">{name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
            <div className="pt-2">
                <Button variant="tertiary" size="sm" className="px-0 h-auto font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1.5 group/btn">
                    {connected ? "Configure" : "Set up integration"}
                    <ExternalLink className="size-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
            </div>
        </CardContent>
    </Card>
);
