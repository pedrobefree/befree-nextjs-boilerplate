
import { useEffect } from "react";

export function useResizeObserver({ ref, onResize }: { ref: React.RefObject<HTMLElement | null>, onResize: () => void, box?: string }) {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(() => {
            onResize();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, onResize]);
}
