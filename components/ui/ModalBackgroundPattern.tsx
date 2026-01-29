import type { FC } from "react";

// Decorative SVG pattern used behind FeaturedIcon in modals
// Uses currentColor so it inherits the text color of its parent
export const ModalBackgroundPattern: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className}
        width="336"
        height="336"
        viewBox="0 0 336 336"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="168" cy="168" r="48" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="168" cy="168" r="88" stroke="currentColor" strokeOpacity="0.20" />
        <circle cx="168" cy="168" r="128" stroke="currentColor" strokeOpacity="0.15" />
        <circle cx="168" cy="168" r="168" stroke="currentColor" strokeOpacity="0.10" />
    </svg>
);
