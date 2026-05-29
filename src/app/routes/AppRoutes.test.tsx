import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import { AppRoutes } from "./AppRoutes";

describe("AppRoutes", () => {
    it("renders HomePage on '/'", async () => {
        renderWithProviders(<AppRoutes />, { routerProps: { initialEntries: ["/"] } });

        expect(await screen.findByText(/созданные для тебя/i)).toBeInTheDocument();
    });

    it("renders CatalogPage on '/catalog'", async () => {
        renderWithProviders(<AppRoutes />, { routerProps: { initialEntries: ["/catalog"] } });

        expect(await screen.findByText(/Украшения, созданные вручную/i)).toBeInTheDocument();
        expect(
            await screen.findByRole("button", { name: "Серьги" }),
        ).toBeInTheDocument();
    });

    it("renders NewsPage on '/news'", async () => {
        renderWithProviders(<AppRoutes />, { routerProps: { initialEntries: ["/news"] } });

        expect(await screen.findByText(/О чём мы пишем/i)).toBeInTheDocument();
    });

    it("renders AboutPage on '/about'", async () => {
        renderWithProviders(<AppRoutes />, { routerProps: { initialEntries: ["/about"] } });

        expect(
            await screen.findByText(/Маленький бренд с большой душой/i),
        ).toBeInTheDocument();
    });

    it("renders ReviewsPage on '/reviews'", async () => {
        renderWithProviders(<AppRoutes />, { routerProps: { initialEntries: ["/reviews"] } });

        expect(await screen.findByText(/Что говорят клиенты/i)).toBeInTheDocument();
    });

    it("renders NotFoundPage on unknown route", async () => {
        renderWithProviders(<AppRoutes />, {
            routerProps: { initialEntries: ["/no-such-page"] },
        });

        expect(await screen.findByText("404")).toBeInTheDocument();
        expect(await screen.findByText(/Бусинка потерялась/i)).toBeInTheDocument();
        // Exact match — "/На главную/i" also matches the header logo
        // ("Бусинка — на главную").
        expect(
            await screen.findByRole("link", { name: "На главную" }),
        ).toHaveAttribute("href", "/");
    });
});
