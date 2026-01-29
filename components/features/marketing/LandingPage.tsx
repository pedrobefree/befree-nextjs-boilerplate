"use client";

import { CheckCircle2, Zap, BarChart3, Users, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const LandingPage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-white pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-200 mb-6">
                            New: Unlimited UI v2.0 is out!
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                            Beautiful components for <br />
                            <span className="text-brand-600">modern web apps</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500 md:text-xl">
                            The ultimate React boilerplate with Untitled UI components, advanced data tables,
                            charts, and authentication pages already out of the box.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Button size="xl" className="h-14 px-8 text-lg">
                                Get started free
                            </Button>
                            <Button variant="secondary" size="xl" className="h-14 px-8 text-lg">
                                View components
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <path d="M500,1000 C223.857625,1000 0,776.142375 0,500 C0,223.857625 223.857625,0 500,0 C776.142375,0 1000,223.857625 1000,500 C1000,776.142375 776.142375,1000 500,1000 Z M500,900 C720.9139,900 900,720.9139 900,500 C900,279.0861 720.9139,100 500,100 C279.0861,100 100,279.0861 100,500 C100,720.9139 279.0861,900 500,900 Z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Social Proof */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">
                        TRUSTED BY OVER 1,000+ DISRUPTIVE TEAMS
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                        {/* Placeholder Logos */}
                        <div className="text-2xl font-bold italic text-gray-900">Bolt</div>
                        <div className="text-2xl font-bold italic text-gray-900">Linear</div>
                        <div className="text-2xl font-bold italic text-gray-900">Figma</div>
                        <div className="text-2xl font-bold italic text-gray-900">Stripe</div>
                        <div className="text-2xl font-bold italic text-gray-900">Vercel</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-brand-600 font-semibold mb-2">Features</h2>
                        <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Everything you need to ship faster
                        </h3>
                        <p className="mt-4 text-lg text-gray-500">
                            Build and scale your application with a suite of professional components.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        <FeatureCard
                            icon={Zap}
                            title="Lightning Fast"
                            description="Built on top of Vite and React 18, optimized for performance and developer experience."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Advanced Charts"
                            description="Ready-to-use charts with Recharts, beautifully styled to match your dashboard."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Role-based Access"
                            description="Pre-built authentication flows and layout structures for permissions management."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Team Collaboration"
                            description="Components designed for multi-user environments and team workspaces."
                        />
                        <FeatureCard
                            icon={Globe}
                            title="Global Ready"
                            description="Full support for internationalization and responsive layouts for any screen."
                        />
                        <FeatureCard
                            icon={CheckCircle2}
                            title="Production Ready"
                            description="Thoroughly tested components that follow accessibility and security best practices."
                        />
                    </div>
                </div>
            </section>

            {/* Image/Highlight Section */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                                Analytics at your <br />
                                <span className="text-brand-400">fingertips.</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Get insights from your data faster with our integrated dashboard tools.
                                We've done the heavy lifting so you can focus on building your business.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-brand-500/10 p-1">
                                        <CheckCircle2 className="h-5 w-5 text-brand-400" />
                                    </div>
                                    <span className="text-gray-300 font-medium">Real-time data synchronization</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-brand-500/10 p-1">
                                        <CheckCircle2 className="h-5 w-5 text-brand-400" />
                                    </div>
                                    <span className="text-gray-300 font-medium">Customizable report builder</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-brand-500/10 p-1">
                                        <CheckCircle2 className="h-5 w-5 text-brand-400" />
                                    </div>
                                    <span className="text-gray-300 font-medium">Automated email alerts</span>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="aspect-video rounded-2xl bg-gray-800 border-8 border-gray-700 shadow-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670&auto=format&fit=crop"
                                    alt="Dashboard preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Accent elements */}
                            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-brand-600/20 blur-3xl pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex flex-col p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="size-12 rounded-lg bg-brand-50 flex items-center justify-center mb-6">
            <Icon className="h-6 w-6 text-brand-600" />
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-500">{description}</p>
    </div>
);
