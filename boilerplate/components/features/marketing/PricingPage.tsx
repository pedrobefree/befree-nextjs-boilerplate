"use client";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/utils";

export const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const plans = [
        {
            name: "Free",
            price: "0",
            description: "Essential features for small projects.",
            features: ["Basic analytics", "Up to 3 projects", "Unlimited viewers", "Email support"],
            cta: "Get started",
            popular: false
        },
        {
            name: "Pro",
            price: billingCycle === "yearly" ? "29" : "39",
            description: "Advanced tools for growing teams.",
            features: ["Advanced analytics", "Unlimited projects", "Team collaboration", "Priority support", "Custom domains"],
            cta: "Start free trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Sophisticated solutions for large orgs.",
            features: ["Custom integrations", "Dedicated account manager", "SLA guarantees", "Advanced security", "On-premise options"],
            cta: "Contact sales",
            popular: false
        }
    ];

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-brand-600 font-semibold mb-2">Pricing</h2>
                    <h3 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Plans for teams of all sizes
                    </h3>
                    <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
                        Whether you're a solo founder or a large organization, we have a plan that fits your needs.
                        Save 20% by choosing yearly billing.
                    </p>

                    {/* Toggle */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <span className={cx("text-sm font-medium", billingCycle === "monthly" ? "text-gray-900" : "text-gray-500")}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(prev => prev === "monthly" ? "yearly" : "monthly")}
                            className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
                        >
                            <div className={cx(
                                "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                                billingCycle === "yearly" ? "translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                        <span className={cx("text-sm font-medium", billingCycle === "yearly" ? "text-gray-900" : "text-gray-500")}>Yearly</span>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cx(
                                "flex flex-col p-8 rounded-2xl border transition-all",
                                plan.popular ? "border-brand-600 bg-white shadow-xl scale-105" : "border-gray-100 bg-white"
                            )}
                        >
                            {plan.popular && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Most Popular
                                </span>
                            )}
                            <div className="mb-8">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                                <p className="text-gray-500 text-sm h-10">{plan.description}</p>
                                <div className="mt-6 flex items-baseline">
                                    <span className="text-5xl font-extrabold text-gray-900">{plan.price !== "Custom" && "$"}{plan.price}</span>
                                    {plan.price !== "Custom" && (
                                        <span className="ml-2 text-gray-500 font-medium">/mo</span>
                                    )}
                                </div>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 rounded-full bg-brand-50 p-0.5">
                                            <Check className="h-4 w-4 text-brand-600" />
                                        </div>
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant={plan.popular ? "primary" : "secondary"}
                                size="lg"
                                className="w-full justify-center h-12"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQs */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        <FAQItem
                            question="Can I change my plan later?"
                            answer="Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new price will be prorated for the remainder of your billing cycle."
                        />
                        <FAQItem
                            question="Is there a free trial for the Pro plan?"
                            answer="Absolutely! You can try the Pro plan for free for 14 days. No credit card required to start."
                        />
                        <FAQItem
                            question="What happens if I exceed my project limit?"
                            answer="We'll notify you when you're close to your limit. You can easily upgrade to Pro to unlock unlimited projects."
                        />
                        <FAQItem
                            question="Do you offer discounts for non-profits?"
                            answer="Yes, we support mission-driven organizations with special discounts. Please contact our sales team to learn more."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-left"
            >
                <span className="text-lg font-bold text-gray-900">{question}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            {isOpen && (
                <p className="mt-4 text-gray-500 max-w-3xl leading-relaxed">
                    {answer}
                </p>
            )}
        </div>
    );
};
