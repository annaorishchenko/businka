export const typography = {
    fontFamily: {
        display: `"Montserrat", "Helvetica Neue", Arial, sans-serif`,
        serif: `"Cormorant Garamond", "Times New Roman", serif`,
        script: `"Caveat", "Brush Script MT", cursive`,
        mono: `"JetBrains Mono", "Consolas", monospace`,
    },
    weight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    size: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        md: "1.125rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.75rem",
        "3xl": "clamp(2.5rem, 5vw, 4rem)",
        hero: "clamp(3rem, 7vw, 5.5rem)",
        display: "clamp(4rem, 12vw, 13rem)",
    },
    lineHeight: {
        tight: 1.1,
        normal: 1.35,
        loose: 1.6,
    },
} as const;

export type Typography = typeof typography;
