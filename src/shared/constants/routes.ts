export const ROUTES = {
    HOME: "/",
    CATALOG: "/catalog",
    NEWS: "/news",
    ABOUT: "/about",
    REVIEWS: "/reviews",
    NOT_FOUND: "*",
} as const;

export type RouteKey = keyof typeof ROUTES;

// labels are derived via i18n in components (t('nav.news') etc.)
export const NAV_ITEMS = [
    { to: ROUTES.NEWS, labelKey: "nav.news" },
    { to: ROUTES.CATALOG, labelKey: "nav.catalog" },
    { to: ROUTES.ABOUT, labelKey: "nav.about" },
    { to: ROUTES.REVIEWS, labelKey: "nav.reviews" },
] as const;
