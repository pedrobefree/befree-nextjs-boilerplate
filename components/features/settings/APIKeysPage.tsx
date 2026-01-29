"use client";

import { useState } from "react";
import { Key, Copy, Trash2, Plus, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface APIKey {
    id: string;
    name: string;
    key: string;
    lastUsed: string;
    created: string;
    status: "active" | "revoked";
}

const initialKeys: APIKey[] = [
    { id: "1", name: "Production API Key", key: "sk_live_••••••••••••4e2a", lastUsed: "2 mins ago", created: "Jan 12, 2026", status: "active" },
    { id: "2", name: "Development Key", key: "sk_test_••••••••••••8f1c", lastUsed: "1 day ago", created: "Jan 15, 2026", status: "active" },
];

export const APIKeysPage = () => {
    const [keys, setKeys] = useState<APIKey[]>(initialKeys);
    const { addToast } = useToast();

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key);
        addToast({
            title: "Copied to clipboard",
            description: "The API key has been copied to your clipboard.",
            type: "success"
        });
    };

    const handleRevoke = (id: string) => {
        setKeys(keys.filter(k => k.id !== id));
        addToast({
            title: "Key revoked",
            description: "The API key has been successfully revoked.",
            type: "success"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
                    <p className="text-sm text-gray-500">Manage your API keys for programmatic access to the workspace.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="size-4" /> Create new key
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Active Keys</CardTitle>
                    <CardDescription>A list of keys currently active in your workspace.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-y border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Key</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Last Used</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Created</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {keys.map((key) => (
                                    <tr key={key.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Key className="size-4 text-gray-400" />
                                                <span className="text-sm font-semibold text-gray-900">{key.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-500">
                                            {key.key}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {key.lastUsed}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {key.created}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="tertiary" size="sm" onClick={() => handleCopy(key.key)}>
                                                <Copy className="size-4" />
                                            </Button>
                                            <Button variant="tertiary" size="sm" onClick={() => handleRevoke(key.id)} className="text-error-600 hover:text-error-700">
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 flex gap-4">
                <div className="size-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <Info className="size-5 text-brand-600" />
                </div>
                <div className="space-y-1 text-sm">
                    <h4 className="font-bold text-brand-900">Security Best Practices</h4>
                    <p className="text-brand-700 leading-relaxed">
                        Never share your API keys or expose them in client-side code. Use environment variables to store keys securely.
                        Revoke any keys that may have been compromised immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};
