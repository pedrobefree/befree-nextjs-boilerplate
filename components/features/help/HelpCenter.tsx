"use client";

import { useState } from "react";
import { Search, Book, Zap, Shield, HelpCircle, ArrowRight, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cx } from "@/lib/utils";

interface Article {
    id: string;
    title: string;
    description: string;
    category: "getting-started" | "account" | "features" | "security";
}

const categories = [
    { id: "getting-started", title: "Getting Started", icon: Zap, description: "Everything you need to know to get up and running." },
    { id: "account", title: "Account & Billing", icon: Shield, description: "Manage your subscription, team, and security settings." },
    { id: "features", title: "Product Features", icon: Book, description: "Deep dives into projects, automations, and reporting." },
    { id: "support", title: "Support & FAQ", icon: HelpCircle, description: "Find answers to frequently asked questions." },
];

const articles: Article[] = [
    { id: "1", title: "Setting up your workspace", description: "Learn how to configure your team's workspace for the first time.", category: "getting-started" },
    { id: "2", title: "Inviting team members", description: "How to send invitations and manage team roles.", category: "getting-started" },
    { id: "3", title: "Managing billing & plans", description: "Updating your credit card and choosing the right tier.", category: "account" },
    { id: "4", title: "Configuring multi-factor auth", description: "Keep your account safe with 2FA and secure passwords.", category: "security" },
];

interface HelpCenterProps {
    onContactSupport?: () => void;
}

export const HelpCenter = ({ onContactSupport }: HelpCenterProps) => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    const selectedArticle = articles.find(a => a.id === selectedArticleId);

    const filteredArticles = articles.filter(a =>
        (selectedCategory ? a.category === selectedCategory : true) &&
        (a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-12">
            {selectedArticle ? (
                <ArticleView article={selectedArticle} onBack={() => setSelectedArticleId(null)} />
            ) : (
                <>
                    {/* Hero Section */}
                    <div className="bg-brand-900 rounded-3xl p-12 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-600)_0%,_transparent_50%)] opacity-40" />
                        <div className="relative z-10 space-y-4">
                            <h1 className="text-display-sm font-bold text-white">How can we help?</h1>
                            <p className="text-brand-200 text-lg max-w-xl mx-auto">Search our knowledge base for answers or explore help topics below.</p>
                            <div className="max-w-2xl mx-auto relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                                <Input
                                    placeholder="Search for articles, guides, and more..."
                                    className="h-14 pl-12 bg-white/95 border-none shadow-xl text-lg rounded-2xl focus:ring-4 focus:ring-brand-500/20"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Knowledge Base</h3>
                                <nav className="space-y-1">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                                            className={cx(
                                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm",
                                                selectedCategory === cat.id
                                                    ? "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <cat.icon className={cx("size-4", selectedCategory === cat.id ? "text-brand-600" : "text-gray-400")} />
                                            {cat.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <Card className="bg-gray-900 text-white border-none overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <MessageSquare className="size-20" />
                                </div>
                                <CardContent className="p-6 space-y-4 relative z-10">
                                    <h4 className="font-bold text-lg leading-tight">Can't find what you're looking for?</h4>
                                    <p className="text-gray-400 text-sm">Our support team is available 24/7 to help with any questions.</p>
                                    <Button
                                        className="w-full bg-white text-gray-900 hover:bg-gray-100 border-none transition-transform hover:-translate-y-1"
                                        onClick={onContactSupport}
                                    >
                                        Contact Support
                                    </Button>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Article List */}
                        <main className="lg:col-span-3 space-y-8">
                            {selectedCategory && (
                                <div className="flex items-center gap-2 text-sm">
                                    <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-gray-900 transition-colors">All articles</button>
                                    <ChevronRight className="size-4 text-gray-300" />
                                    <span className="font-bold text-gray-900">{categories.find(c => c.id === selectedCategory)?.title}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredArticles.length > 0 ? (
                                    filteredArticles.map((article) => (
                                        <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticleId(article.id)} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                                        <Search className="size-12 text-gray-200 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                                        <p className="text-gray-500">Try adjusting your search or category filters.</p>
                                    </div>
                                )}
                            </div>

                            {/* Popular Resources */}
                            <div className="pt-12 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Popular Resources</h2>
                                    <Button variant="tertiary" className="text-brand-700 font-bold group">
                                        View all documentation <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <ResourceLink title="API Reference" icon={ExternalLink} />
                                    <ResourceLink title="Changelog" icon={ChevronRight} />
                                    <ResourceLink title="Video Tutorials" icon={ExternalLink} />
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            )}
        </div>
    );
};

const ArticleView = ({ article, onBack }: { article: Article, onBack: () => void }) => (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-6">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors group">
                <ArrowRight className="size-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
            </button>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-700 uppercase tracking-widest">
                    <Book className="size-4" /> {article.category.replace("-", " ")}
                </div>
                <h1 className="text-display-md font-bold text-gray-900 leading-tight">{article.title}</h1>
                <p className="text-xl text-gray-500 leading-relaxed">{article.description}</p>
            </div>
        </div>

        <div className="prose prose-brand max-w-none">
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">In this article</h3>
                <ul className="space-y-3">
                    <li><a href="#" className="text-brand-700 font-semibold hover:underline">Prerequisites</a></li>
                    <li><a href="#" className="text-brand-700 font-semibold hover:underline">Initial Configuration</a></li>
                    <li><a href="#" className="text-brand-700 font-semibold hover:underline">Troubleshooting Common Issues</a></li>
                </ul>
            </div>

            <div className="py-12 space-y-8 text-gray-700 leading-7">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2 className="text-2xl font-bold text-gray-900 pt-4">Step 1: Initial Setup</h2>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="bg-brand-50 border-l-4 border-brand-600 p-6 rounded-r-2xl">
                    <p className="font-semibold text-brand-900 text-sm uppercase tracking-wide mb-2">Pro Tip</p>
                    <p className="text-brand-800 italic">"Always ensure your workspace is backed up before making significant changes to the team structure."</p>
                </div>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Was this article helpful?</h4>
                <p className="text-sm text-gray-500">Your feedback helps us improve our documentation.</p>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="secondary" className="px-6">Yes, thanks!</Button>
                <Button variant="secondary" className="px-6 text-gray-500">Not really</Button>
            </div>
        </div>
    </div>
);

const ArticleCard = ({ article, onClick }: { article: Article, onClick: () => void }) => (
    <Card className="group hover:border-brand-300 hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
        <CardContent className="p-6 space-y-3">
            <h4 className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors">{article.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.description}</p>
            <div className="pt-2 flex items-center text-xs font-bold text-brand-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Read Article <ChevronRight className="size-3.5 ml-1" />
            </div>
        </CardContent>
    </Card>
);

const ResourceLink = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-between group cursor-pointer">
        <span className="font-semibold text-gray-700 group-hover:text-gray-900">{title}</span>
        <Icon className="size-4 text-gray-400 group-hover:text-brand-600 transition-colors" />
    </div>
);
