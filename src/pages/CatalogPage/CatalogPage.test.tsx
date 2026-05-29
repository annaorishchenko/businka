import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import CatalogPage from "./CatalogPage";
import { PRODUCTS } from "@/shared/constants/products";

describe("CatalogPage", () => {
    it("renders all products on initial render", () => {
        renderWithProviders(<CatalogPage />);

        PRODUCTS.forEach((product) => {
            expect(
                screen.getByRole("heading", { name: product.title, level: 3 }),
            ).toBeInTheDocument();
        });

        // total count of product cards matches PRODUCTS length
        const titles = screen
            .getAllByRole("heading", { level: 3 })
            .map((h) => h.textContent);
        expect(titles).toHaveLength(PRODUCTS.length);
    });

    it("filters by 'Серьги' category", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CatalogPage />);

        await user.click(screen.getByRole("button", { name: "Серьги" }));

        const earrings = PRODUCTS.filter((p) => p.category === "earrings");
        const nonEarrings = PRODUCTS.filter((p) => p.category !== "earrings");

        earrings.forEach((p) => {
            expect(
                screen.getByRole("heading", { name: p.title, level: 3 }),
            ).toBeInTheDocument();
        });
        nonEarrings.forEach((p) => {
            expect(
                screen.queryByRole("heading", { name: p.title, level: 3 }),
            ).not.toBeInTheDocument();
        });
    });

    it("sets aria-pressed=true on the active chip and false on the rest", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CatalogPage />);

        const earringsChip = screen.getByRole("button", { name: "Серьги" });
        const allChip = screen.getByRole("button", { name: "Всё" });
        const ringsChip = screen.getByRole("button", { name: "Кольца" });

        // initial: 'Всё' is active
        expect(allChip).toHaveAttribute("aria-pressed", "true");
        expect(earringsChip).toHaveAttribute("aria-pressed", "false");
        expect(ringsChip).toHaveAttribute("aria-pressed", "false");

        await user.click(earringsChip);

        expect(earringsChip).toHaveAttribute("aria-pressed", "true");
        expect(allChip).toHaveAttribute("aria-pressed", "false");
        expect(ringsChip).toHaveAttribute("aria-pressed", "false");
    });

    it("clicking 'Всё' restores the full product list", async () => {
        const user = userEvent.setup();
        renderWithProviders(<CatalogPage />);

        await user.click(screen.getByRole("button", { name: "Серьги" }));
        // sanity: count is reduced
        expect(
            screen.getAllByRole("heading", { level: 3 }).length,
        ).toBeLessThan(PRODUCTS.length);

        await user.click(screen.getByRole("button", { name: "Всё" }));

        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
            PRODUCTS.length,
        );
    });
});
