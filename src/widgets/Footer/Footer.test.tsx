import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import { Footer } from "./Footer";

describe("Footer", () => {
    it("renders the 'Контакты' heading", () => {
        renderWithProviders(<Footer />);

        expect(screen.getByText("Контакты")).toBeInTheDocument();
    });

    it("renders phone link with tel: protocol", () => {
        renderWithProviders(<Footer />);

        const phoneLink = screen.getByRole("link", { name: /\+7 906 415 17 82/ });
        expect(phoneLink).toHaveAttribute("href", "tel:+79064151782");
    });

    it("renders email link with mailto: protocol", () => {
        renderWithProviders(<Footer />);

        const emailLink = screen.getByRole("link", { name: /businka@mail\.ru/ });
        expect(emailLink).toHaveAttribute("href", "mailto:businka@mail.ru");
    });

    it("renders Telegram link opening in a new tab with safe rel", () => {
        renderWithProviders(<Footer />);

        const telegram = screen.getByRole("link", { name: /Telegram/ });
        expect(telegram).toHaveAttribute("target", "_blank");
        expect(telegram).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders Instagram link opening in a new tab with safe rel", () => {
        renderWithProviders(<Footer />);

        const instagram = screen.getByRole("link", { name: /Instagram/ });
        expect(instagram).toHaveAttribute("target", "_blank");
        expect(instagram).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders physical address", () => {
        renderWithProviders(<Footer />);

        expect(
            screen.getByText(/г\. Ростов-на-Дону, ул\. Максима Горького, 75/),
        ).toBeInTheDocument();
    });

    it("renders Meta disclaimer", () => {
        renderWithProviders(<Footer />);

        expect(screen.getByText(/экстремистской/i)).toBeInTheDocument();
    });
});
