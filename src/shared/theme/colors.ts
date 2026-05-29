export const colors = {
    bgCream: "#FEFBEA",
    bgRose: "#FDE6DB",

    primary: "#D58D98",
    primaryHover: "#DC919C",
    primarySoft: "rgba(252, 167, 175, 0.32)",

    accent: "#9B8E5A",
    accentMuted: "#A79B6C",

    textPrimary: "#3B342A",
    textMuted: "#7A6F58",
    textOnPrimary: "#FFFFFF",

    surface: "#FFFFFF",
    border: "rgba(208, 213, 226, 0.6)",
    overlay: "rgba(202, 190, 190, 0.07)",
} as const;

export type Colors = typeof colors;
