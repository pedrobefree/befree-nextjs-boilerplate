"use client";

import { Check } from "lucide-react";
import { cx } from "@/lib/utils";

export interface Step {
    id: string;
    title: string;
    description?: string;
}

export interface StepsProps {
    steps: Step[];
    currentStepIndex: number;
    className?: string;
}

export const Steps = ({ steps, currentStepIndex, className }: StepsProps) => {
    return (
        <nav aria-label="Progress" className={cx(className)}>
            <ol className="overflow-hidden md:flex md:space-x-8 md:space-y-0">
                {steps.map((step, index) => {
                    const status =
                        index < currentStepIndex ? "complete" :
                            index === currentStepIndex ? "current" : "upcoming";

                    return (
                        <li key={step.id} className="relative md:flex-1">
                            {status === "complete" ? (
                                <a href="#" className="group flex w-full items-center">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 group-hover:bg-brand-800">
                                            <Check className="h-6 w-6 text-white" aria-hidden="true" />
                                        </span>
                                        <span className="ml-4 flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{step.title}</span>
                                            {step.description && <span className="text-sm text-gray-500">{step.description}</span>}
                                        </span>
                                    </span>
                                </a>
                            ) : status === "current" ? (
                                <a href="#" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-600">
                                        <span className="text-brand-600">{index + 1}</span>
                                    </span>
                                    <span className="ml-4 flex flex-col">
                                        <span className="text-sm font-medium text-brand-600">{step.title}</span>
                                        {step.description && <span className="text-sm text-gray-500">{step.description}</span>}
                                    </span>
                                </a>
                            ) : (
                                <a href="#" className="group flex items-center">
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                            <span className="text-gray-500 group-hover:text-gray-900">{index + 1}</span>
                                        </span>
                                        <span className="ml-4 flex flex-col">
                                            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.title}</span>
                                            {step.description && <span className="text-sm text-gray-500">{step.description}</span>}
                                        </span>
                                    </span>
                                </a>
                            )}
                            {index !== steps.length - 1 && (
                                <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        viewBox="0 0 22 80"
                                        fill="none"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 -2L20 40L0 82"
                                            vectorEffect="non-scaling-stroke"
                                            stroke="currentcolor"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
