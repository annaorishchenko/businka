import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
    it("renders the 404 code", () => {
        renderWithProviders(<NotFoundPage />);

        expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    });

    it("renders a 'На главную' link pointing to '/'", () => {
        renderWithProviders(<NotFoundPage />);

        const link = screen.getByRole("link", { name: /На главную/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });
});
