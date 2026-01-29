"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FeaturedIcon } from "@/components/ui/FeaturedIcon";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface User {
    id: number;
    name: string;
    email: string;
}

/**
 * Example of data fetching pattern with loading, error, and success states.
 */
export function DataFetchingExample() {
    const [data, setData] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulating an API call
            const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
            if (!response.ok) throw new Error("Failed to fetch data");
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Team Status</CardTitle>
                        <p className="text-sm text-gray-500">Live data fetched from external API.</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={fetchData} isDisabled={loading}>
                        <RefreshCw className={`size-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="min-h-[200px] flex flex-col items-center justify-center">
                {loading && (
                    <div className="space-y-4 text-center">
                        <RefreshCw className="size-8 text-brand-600 animate-spin mx-auto" />
                        <p className="text-gray-500">Loading team members...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center space-y-4">
                        <FeaturedIcon color="error" theme="light">
                            <AlertTriangle className="size-5" />
                        </FeaturedIcon>
                        <div className="space-y-1">
                            <p className="font-bold text-gray-900">Oops! {error}</p>
                            <p className="text-sm text-gray-500">We couldn't load the team. Please try again.</p>
                        </div>
                        <Button onClick={fetchData}>Try Again</Button>
                    </div>
                )}

                {data && !loading && (
                    <ul className="w-full divide-y divide-gray-100">
                        {data.map((user) => (
                            <li key={user.id} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-success-500" />
                                    <span className="text-xs font-medium text-gray-600">Online</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
