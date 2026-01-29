import type { SVGProps } from "react";
import {
    Github,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Youtube,
    Chrome,
    Figma,
    Dribbble
} from "lucide-react";

export const SocialIcon = ({ type, ...props }: { type: string } & SVGProps<SVGSVGElement>) => {
    switch (type.toLowerCase()) {
        case "github": return <Github {...props} />;
        case "twitter": return <Twitter {...props} />;
        case "linkedin": return <Linkedin {...props} />;
        case "facebook": return <Facebook {...props} />;
        case "instagram": return <Instagram {...props} />;
        case "youtube": return <Youtube {...props} />;
        case "google": return <Chrome {...props} />; // Placeholder for Google
        case "figma": return <Figma {...props} />;
        case "dribbble": return <Dribbble {...props} />;
        default: return null;
    }
};
