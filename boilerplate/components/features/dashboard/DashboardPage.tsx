import { LayoutGrid, Users, Plus, Star, ArrowUpRight, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { MetricCard } from "@/components/ui/MetricCard";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { ActiveProjectsCard } from "./ActiveProjectsCard";
import { RevenueChart } from "../charts/RevenueChart";

interface DashboardPageProps {
    onNewProject: () => void;
}

/**
 * DashboardPage is the main landing view for authenticated users.
 * Displays workspace overview, metrics, and project status.
 * 
 * @param {DashboardPageProps} props
 * @param {Function} props.onNewProject - Callback to trigger the new project flow.
 */
export function DashboardPage({ onNewProject }: DashboardPageProps) {
    const router = useRouter();
    return (
        <div className="space-y-8 lg:space-y-12">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b border-gray-100">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-widest">
                        <LayoutGrid className="size-3.5" /> Workspace Overview
                    </div>
                    <h1 className="text-display-xs sm:text-display-sm font-bold text-gray-900 tracking-tight">Welcome back, Olivia</h1>
                    <p className="text-gray-500 text-base sm:text-lg">Here's what's happening in your workspace today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette", { detail: { search: "Invite" } }))} className="gap-2 flex-1 sm:flex-none">
                        <Users className="size-4" /> Team
                    </Button>
                    <Button className="gap-2 shadow-lg shadow-brand-500/20 flex-1 sm:flex-none" onClick={onNewProject}>
                        <Plus className="size-4" /> New Project
                    </Button>
                </div>
            </header>

            <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Active Projects"
                    value="12"
                    trend={{ value: "2 new", direction: "up", label: "this week" }}
                />
                <MetricCard
                    title="Pending Tasks"
                    value="34"
                    trend={{ value: "5 due today", direction: "neutral", label: "urgent" }}
                />
                <MetricCard
                    title="Team Velocity"
                    value="92%"
                    trend={{ value: "12%", direction: "up", label: "vs last sprint" }}
                />
                <MetricCard
                    title="Upcoming Demos"
                    value="3"
                    trend={{ value: "Tomorrow", direction: "neutral", label: "at 10:00am" }}
                />
            </section>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Revenue Forecast</CardTitle>
                                <CardDescription className="hidden sm:block">Monthly recurring revenue compared to targets.</CardDescription>
                            </div>
                            <Button variant="secondary" size="sm" className="gap-2">
                                <TrendingUp className="size-4" /> <span className="hidden sm:inline">Full Report</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[250px] sm:h-[300px]">
                        <RevenueChart />
                    </CardContent>
                </Card>

                <ActiveProjectsCard />
            </div>

            <section className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Insights</CardTitle>
                        <CardDescription>Automated performance analysis.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InsightItem
                            title="Productivity Boost"
                            description="Your team completed 24% more tasks."
                            type="success"
                        />
                        <InsightItem
                            title="High Resource Usage"
                            description="Three projects nearing budget limits."
                            type="warning"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Goal Completion</CardTitle>
                        <CardDescription>Quarterly objectives progress.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <GoalItem title="Q1 Revenue Target" progress={78} />
                        <GoalItem title="New Feature Launch" progress={45} />
                    </CardContent>
                </Card>
            </section>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Team Performance</CardTitle>
                            <CardDescription>Individual contributor metrics this month</CardDescription>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => router.push("/projects")}
                        >
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-5">
                        <TeamMemberProgress name="Phoenix Baker" tasks={24} completion={92} avatar="PB" />
                        <TeamMemberProgress name="Lana Steiner" tasks={31} completion={88} avatar="LS" />
                        <TeamMemberProgress name="Demi Wilkinson" tasks={18} completion={95} avatar="DW" />
                        <TeamMemberProgress name="Candice Wu" tasks={22} completion={85} avatar="CW" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/**
 * InsightItem displays a single automated performance insight.
 */
function InsightItem({ title, description, type }: { title: string, description: string, type: "success" | "warning" }) {
    return (
        <div className={cn(
            "p-4 rounded-xl border flex gap-3",
            type === "success" ? "bg-success-25 border-success-100" : "bg-warning-25 border-warning-100"
        )}>
            <div className={cn(
                "size-8 rounded-lg flex items-center justify-center shrink-0",
                type === "success" ? "bg-success-100 text-success-600" : "bg-warning-100 text-warning-600"
            )}>
                {type === "success" ? <Star className="size-4" /> : <ArrowUpRight className="size-4" />}
            </div>
            <div className="space-y-1">
                <p className={cn("text-sm font-bold", type === "success" ? "text-success-900" : "text-warning-900")}>{title}</p>
                <p className={cn("text-xs", type === "success" ? "text-success-700" : "text-warning-700")}>{description}</p>
            </div>
        </div>
    );
}

/**
 * GoalItem displays progress towards a specific objective.
 */
function GoalItem({ title, progress }: { title: string, progress: number }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{title}</span>
                <span className="font-bold text-gray-900">{progress}%</span>
            </div>
            <Progress value={progress} size="sm" variant="brand" />
        </div>
    );
}

/**
 * TeamMemberProgress displays a user's task completion stats.
 */
function TeamMemberProgress({ name, tasks, completion, avatar }: { name: string, tasks: number, completion: number, avatar: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{name}</span>
                    <span className="text-gray-500">{tasks} tasks · {completion}%</span>
                </div>
                <Progress value={completion} size="sm" variant="brand" />
            </div>
        </div>
    );
}
