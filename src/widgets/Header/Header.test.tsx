import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import { Header } from "./Header";
import { NAV_ITEMS } from "@/shared/constants/routes";

describe("Header", () => {
    it("renders all 4 nav items in the main navigation", () => {
        renderWithProviders(<Header />);

        const nav = screen.getByRole("navigation", { name: "Основная навигация" });

        NAV_ITEMS.forEach(({ label }) => {
            expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
        });
    });

    it("each nav item points to its route", () => {
        renderWithProviders(<Header />);

        const nav = screen.getByRole("navigation", { name: "Основная навигация" });

        NAV_ITEMS.forEach(({ label, to }) => {
            expect(within(nav).getByRole("link", { name: label })).toHaveAttribute(
                "href",
                to,
            );
        });
    });

    it("renders the logo as a link to '/'", () => {
        renderWithProviders(<Header />);

        const logo = screen.getAllByRole("link", { name: "Бусинка — на главную" })[0];

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("href", "/");
    });

    it("exposes a burger button to open the mobile menu", () => {
        renderWithProviders(<Header />);

        // The burger button has `display: none` until the mobile breakpoint
        // (styled-components emits CSS, which jsdom treats as hidden), so
        // query by accessible label instead of by role.
        expect(screen.getByLabelText("Открыть меню")).toBeInTheDocument();
    });

    it("opens mobile menu when the burger is clicked", async () => {
        const user = userEvent.setup();
        const { container } = renderWithProviders(<Header />);

        const mobileMenu = container.querySelector("[aria-hidden]");
        expect(mobileMenu).toHaveAttribute("aria-hidden", "true");

        await user.click(screen.getByLabelText("Открыть меню"));

        expect(mobileMenu).toHaveAttribute("aria-hidden", "false");
        expect(screen.getByLabelText("Закрыть меню")).toBeInTheDocument();
    });

    it("closes mobile menu when the close button is clicked", async () => {
        const user = userEvent.setup();
        const { container } = renderWithProviders(<Header />);

        const mobileMenu = container.querySelector("[aria-hidden]");

        await user.click(screen.getByLabelText("Открыть меню"));
        expect(mobileMenu).toHaveAttribute("aria-hidden", "false");

        await user.click(screen.getByLabelText("Закрыть меню"));
        expect(mobileMenu).toHaveAttribute("aria-hidden", "true");
    });

    it("closes mobile menu after navigating to another route", async () => {
        const user = userEvent.setup();
        const { container } = renderWithProviders(<Header />);

        const mobileMenu = container.querySelector("[aria-hidden]") as HTMLElement;

        await user.click(screen.getByLabelText("Открыть меню"));
        expect(mobileMenu).toHaveAttribute("aria-hidden", "false");

        // Two links named "Каталог" exist (desktop nav + mobile nav). Pick the
        // one inside the mobile menu.
        const catalogLink = within(mobileMenu).getByRole("link", {
            name: "Каталог",
        });
        await user.click(catalogLink);

        expect(mobileMenu).toHaveAttribute("aria-hidden", "true");
    });
});
