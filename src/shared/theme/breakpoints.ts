export const breakpoints = {
    mobile: 480,
    mobileWide: 800,
    tablet: 1024,
    desktop: 1366,
    desktopWide: 1920,
} as const;

export const media = {
    mobile: `@media (max-width: ${breakpoints.mobile - 1}px)`,
    mobileWide: `@media (max-width: ${breakpoints.mobileWide - 1}px)`,
    tablet: `@media (max-width: ${breakpoints.tablet - 1}px)`,
    desktop: `@media (max-width: ${breakpoints.desktop - 1}px)`,
    desktopWide: `@media (min-width: ${breakpoints.desktopWide}px)`,
} as const;

export type Breakpoints = typeof breakpoints;
