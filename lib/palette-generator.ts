/**
 * Utility to generate a color palette from a single base hex color.
 * Based on logic provided for Untitled UI compatibility.
 */

interface HSL {
    h: number;
    s: number;
    l: number;
}

interface PaletteColor {
    name: string;
    hex: string;
    rgb: string; // Tailwind v4 prefers space-separated RGB: "r g b"
}

function hexToHsl(hex: string): HSL {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToRgbValues(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r} ${g} ${b}`;
}

export function generatePalette(baseHex: string): PaletteColor[] {
    const baseHsl = hexToHsl(baseHex);
    const steps = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    // Lightness mapping for Untitled UI scale
    const lightnessMap: Record<number, number> = {
        25: 99,
        50: 97,
        100: 96,
        200: 88,
        300: 78,
        400: 68,
        500: 58,
        600: baseHsl.l,
        700: 45,
        800: 32,
        900: 18,
        950: 10,
    };

    return steps.map((step) => {
        if (step === 600) {
            return {
                name: `brand-${step}`,
                hex: baseHex.toUpperCase(),
                rgb: hexToRgbValues(baseHex),
            };
        }

        const targetL = lightnessMap[step];

        // Saturation curve
        let satFactor = 1;
        if (step < 400) satFactor = 0.8;
        if (step > 700) satFactor = 1.1;

        const targetS = Math.min(100, baseHsl.s * satFactor);
        const hexResult = hslToHex(baseHsl.h, targetS, targetL);

        return {
            name: `brand-${step}`,
            hex: hexResult,
            rgb: hexToRgbValues(hexResult),
        };
    });
}
