import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "@/widgets/Layout";
import { ROUTES } from "@/shared/constants/routes";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage"));
const NewsPage = lazy(() => import("@/pages/NewsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const Loader = styled.div`
    min-height: 60vh;
    display: grid;
    place-items: center;
    font-family: ${({ theme }) => theme.typography.fontFamily.script};
    font-size: ${({ theme }) => theme.typography.size.xl};
    color: ${({ theme }) => theme.colors.accent};
`;

const Fallback = () => <Loader>Загружаем украшения…</Loader>;

export const AppRoutes = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route
                index
                element={
                    <Suspense fallback={<Fallback />}>
                        <HomePage />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.CATALOG}
                element={
                    <Suspense fallback={<Fallback />}>
                        <CatalogPage />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.NEWS}
                element={
                    <Suspense fallback={<Fallback />}>
                        <NewsPage />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.ABOUT}
                element={
                    <Suspense fallback={<Fallback />}>
                        <AboutPage />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.REVIEWS}
                element={
                    <Suspense fallback={<Fallback />}>
                        <ReviewsPage />
                    </Suspense>
                }
            />
            <Route
                path="*"
                element={
                    <Suspense fallback={<Fallback />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />
        </Route>
    </Routes>
);
