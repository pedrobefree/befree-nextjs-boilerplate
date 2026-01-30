/**
 * Application-wide constants and configuration.
 */

export const APP_CONFIG = {
    name: "Befree Boilerplate",
    description: "A premium Next.js-inspired boilerplate using Untitled UI and Tailwind CSS.",
    version: "1.0.0",
};

export const BRAND_CONFIG = {
    name: "Befree",
    logo: {
        light: "/logo-light.svg",
        dark: "/logo-dark.svg",
        icon: "/icon.svg",
    },
    name_logo: true, // Show brand name alongside logo
    theme: {
        primaryColor: "#4146F6", // Brand primary color
    },
};

export const NAVIGATION = {
    main: [
        { name: "Dashboard", href: "dashboard" },
        { name: "Projects", href: "projects" },
        { name: "Users", href: "users" },
        { name: "Settings", href: "settings" },
    ],
    admin: [
        { name: "Users", href: "users" },
        { name: "Roles", href: "roles" },
        { name: "Activity", href: "activity" },
    ],
};

export const AUTH_CONFIG = {
    loginPath: "/login",
    signupPath: "/signup",
    afterLoginPath: "/dashboard",
};
