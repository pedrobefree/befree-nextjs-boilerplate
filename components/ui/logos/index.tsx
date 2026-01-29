import type { SVGProps } from "react";

export const UntitledUiLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg width="150" height="32" viewBox="0 0 150 32" fill="none" {...props}>
        <path
            d="M20.2 6.4C19.2 5.4 17.8 4.8 16.2 4.8C13 4.8 10.4 7.4 10.4 10.6C10.4 13.8 13 16.4 16.2 16.4C17.8 16.4 19.2 15.8 20.2 14.8L25.2 19.8C23.2 21.8 20.2 23.2 16.2 23.2C9.2 23.2 3.6 17.6 3.6 10.6C3.6 3.6 9.2 -2 16.2 -2C20.2 -2 23.2 -0.6 25.2 1.4L20.2 6.4Z"
            fill="currentColor"
        />
        <text x="36" y="24" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" fill="currentColor">
            Untitled UI
        </text>
    </svg>
);

export const UntitledUiLogoMinimal = (props: SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="4" />
        <circle cx="16" cy="16" r="6" fill="currentColor" />
    </svg>
);
