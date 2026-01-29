
import * as React from "react"

export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>

export const Tooltip = ({ children, title }: { children: React.ReactNode; title?: string | React.ReactNode; placement?: string }) => (
    <div className="group relative inline-block">
        {children}
        {title && (
            <div className="absolute z-50 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none">
                {title}
            </div>
        )}
    </div>
)
