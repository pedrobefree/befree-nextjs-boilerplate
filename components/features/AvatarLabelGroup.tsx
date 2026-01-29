
// import * as React from "react"
import { Avatar } from "@/components/ui/Avatar"

interface AvatarLabelGroupProps {
    src?: string
    title: string
    subtitle: string
    status?: "online" | "offline"
    size?: "sm" | "md" | "lg"
}

export function AvatarLabelGroup({ src, title, subtitle, status, size }: AvatarLabelGroupProps) {
    return (
        <div className="flex items-center gap-3">
            <Avatar src={src} size={size as any} status={status} />
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <span className="text-xs text-gray-500">{subtitle}</span>
            </div>
        </div>
    )
}
