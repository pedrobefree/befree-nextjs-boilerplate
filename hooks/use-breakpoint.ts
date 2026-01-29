
import { useState, useEffect } from 'react';

export function useBreakpoint() {
    // Initialize with false (server-side safe)
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const query = `(min-width: 1024px)`;
        const media = window.matchMedia(query);

        // Set initial value on client
        setMatches(media.matches);

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    return matches;
}
