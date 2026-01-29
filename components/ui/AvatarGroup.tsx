"use client";

import React, { type ReactNode } from "react";
import { Avatar } from "./Avatar";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
    children: ReactNode;
    limit?: number;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
}

const AvatarGroup = ({ children, limit = 4, size = "md", className }: AvatarGroupProps) => {
    const avatars = React.Children.toArray(children);
    const visibleAvatars = avatars.slice(0, limit);
    const extraCount = avatars.length - limit;

    return (
        <div className={cn("flex -space-x-2 isolate", className)}>
            {visibleAvatars.map((avatar, index) => (
                <div key={index} className="ring-2 ring-white rounded-full">
                    {avatar}
                </div>
            ))}
            {extraCount > 0 && (
                <div className={cn(
                    "ring-2 ring-white rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold border border-white",
                    size === "xs" && "size-6 text-[10px]",
                    size === "sm" && "size-8 text-xs",
                    size === "md" && "size-10 text-sm",
                    size === "lg" && "size-12 text-base",
                    size === "xl" && "size-14 text-lg",
                    size === "2xl" && "size-16 text-xl"
                )}>
                    +{extraCount}
                </div>
            )}
        </div>
    );
};

const AvatarGroupItem = ({ src, alt, size = "md" }: { src: string, alt?: string, size?: any }) => (
    <Avatar src={src} alt={alt} size={size} />
);

export { AvatarGroup };
export const AvatarGroupItemComponent = AvatarGroupItem;

// Compound component pattern
export const AvatarGroupRoot = Object.assign(AvatarGroup, {
    Item: AvatarGroupItem
});
