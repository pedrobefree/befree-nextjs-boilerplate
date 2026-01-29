"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cx } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselProps {
    opts?: Parameters<typeof useEmblaCarousel>[0];
    plugins?: Parameters<typeof useEmblaCarousel>[1];
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
    className?: string;
    children?: React.ReactNode;
}

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: CarouselApi;
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    selectedIndex: number;
    scrollSnaps: number[];
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}

const CarouselRoot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        );
        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);
        const [selectedIndex, setSelectedIndex] = React.useState(0);
        const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) {
                return;
            }

            setSelectedIndex(api.selectedScrollSnap());
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext]
        );

        React.useEffect(() => {
            if (!api) return;

            setScrollSnaps(api.scrollSnapList());
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            if (setApi) {
                setApi(api);
            }

            return () => {
                api?.off("select", onSelect);
            };
        }, [api, onSelect, setApi]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation:
                        orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    selectedIndex,
                    scrollSnaps,
                }}
            >
                <div
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={cx("relative", className)}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);
CarouselRoot.displayName = "CarouselRoot";

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                ref={ref}
                className={cx(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className
                )}
                {...props}
            />
        </div>
    );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cx(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className
            )}
            {...props}
        />
    );
});
CarouselItem.displayName = "CarouselItem";

const PrevTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    return (
        <button
            ref={ref}
            className={cx(
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        />
    );
});
PrevTrigger.displayName = "PrevTrigger";

const NextTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
        <button
            ref={ref}
            className={cx(
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        />
    );
});
NextTrigger.displayName = "NextTrigger";

interface IndicatorGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    framed?: boolean;
    size?: "sm" | "md" | "lg";
}

const IndicatorGroup = React.forwardRef<HTMLDivElement, IndicatorGroupProps>(
    ({ className, framed, size = "md", ...props }, ref) => {
        const { scrollSnaps } = useCarousel();

        if (scrollSnaps.length <= 1) return null;

        return (
            <div
                ref={ref}
                className={cx(
                    "flex items-center justify-center gap-2",
                    framed && "rounded-full bg-alpha-white/90 p-2 backdrop-blur-xs",
                    size === "sm" && "gap-1.5",
                    size === "lg" && "gap-3",
                    className
                )}
                {...props}
            >
                {scrollSnaps.map((_, index) => (
                    <Indicator key={index} index={index} size={size} />
                ))}
            </div>
        );
    }
);
IndicatorGroup.displayName = "IndicatorGroup";

const Indicator = ({ index, size = "md" }: { index: number; size?: "sm" | "md" | "lg" }) => {
    const { api, selectedIndex } = useCarousel();
    const isActive = selectedIndex === index;

    const sizeClasses = {
        sm: "h-1.5 w-1.5",
        md: "h-2 w-2",
        lg: "h-2.5 w-2.5",
    };

    return (
        <button
            className={cx(
                "rounded-full transition-all duration-300",
                sizeClasses[size],
                isActive
                    ? "bg-brand-600 shadow-xs"
                    : "bg-gray-200 hover:bg-gray-300"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "step" : undefined}
        />
    );
};

export const Carousel = Object.assign(CarouselRoot, {
    Root: CarouselRoot,
    Content: CarouselContent,
    Item: CarouselItem,
    PrevTrigger: PrevTrigger,
    NextTrigger: NextTrigger,
    IndicatorGroup: IndicatorGroup,
    Indicator: Indicator,
});

export const CarouselIndicator = IndicatorGroup;

export {
    type CarouselApi,
    CarouselContent,
    CarouselItem,
};

