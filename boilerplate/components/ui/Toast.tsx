"use client";

import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cx } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);

        if (toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-md pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: () => void }) => {
    const icons = {
        success: <CheckCircle2 className="size-5 text-success-600" />,
        error: <AlertCircle className="size-5 text-error-600" />,
        warning: <AlertTriangle className="size-5 text-warning-600" />,
        info: <Info className="size-5 text-brand-600" />,
    };

    const bgColors = {
        success: "bg-success-50 border-success-100",
        error: "bg-error-50 border-error-100",
        warning: "bg-warning-50 border-warning-100",
        info: "bg-brand-50 border-brand-100",
    };

    return (
        <div
            className={cx(
                "pointer-events-auto flex w-full items-start gap-4 rounded-xl border p-4 shadow-lg animate-in slide-in-from-right-full duration-300 bg-white",
                toast.type && bgColors[toast.type]
            )}
            role="alert"
        >
            <div className="shrink-0 pt-0.5">
                {toast.type ? icons[toast.type] : icons.info}
            </div>
            <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold text-gray-900">{toast.title}</h4>
                {toast.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">{toast.description}</p>
                )}
            </div>
            <button
                onClick={onRemove}
                className="shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
                <X className="size-4" />
            </button>
        </div>
    );
};
