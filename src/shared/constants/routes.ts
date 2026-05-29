export const ROUTES = {
    HOME: "/",
    CATALOG: "/catalog",
    NEWS: "/news",
    ABOUT: "/about",
    REVIEWS: "/reviews",
    NOT_FOUND: "*",
} as const;

export type RouteKey = keyof typeof ROUTES;

export const NAV_ITEMS = [
    { to: ROUTES.NEWS, label: "Новости" },
    { to: ROUTES.CATALOG, label: "Каталог" },
    { to: ROUTES.ABOUT, label: "О нас" },
    { to: ROUTES.REVIEWS, label: "Отзывы" },
] as const;
