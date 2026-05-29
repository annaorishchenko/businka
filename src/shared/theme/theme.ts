import { colors } from "./colors";
import { typography } from "./typography";
import { breakpoints, media } from "./breakpoints";

export const theme = {
    colors,
    typography,
    breakpoints,
    media,
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
    },
    radius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        round: "999px",
    },
    shadow: {
        sm: "0 2px 6px rgba(155, 142, 90, 0.08)",
        md: "0 8px 24px rgba(155, 142, 90, 0.12)",
        lg: "0 20px 40px rgba(155, 142, 90, 0.16)",
    },
    transition: {
        fast: "150ms ease",
        base: "250ms ease",
        slow: "400ms ease",
    },
    zIndex: {
        base: 1,
        decor: 5,
        header: 10,
        dropdown: 20,
        modal: 100,
    },
} as const;

export type Theme = typeof theme;
