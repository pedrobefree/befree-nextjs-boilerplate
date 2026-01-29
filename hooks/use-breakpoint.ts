
import { useState, useEffect } from 'react';

export function useBreakpoint() {
    // Simple mock: always return true for desktop for now, or use window.matchMedia
    const [matches, setMatches] = useState(() => {
        const query = `(min-width: 1024px)`;
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const query = `(min-width: 1024px)`;
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    return matches;
}
