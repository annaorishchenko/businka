import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";

type Options = Omit<RenderOptions, "wrapper"> & {
    routerProps?: MemoryRouterProps;
};

export const renderWithProviders = (ui: ReactElement, { routerProps, ...options }: Options = {}) =>
    render(ui, {
        wrapper: ({ children }) => (
            <ThemeProvider theme={theme}>
                <MemoryRouter {...routerProps}>{children}</MemoryRouter>
            </ThemeProvider>
        ),
        ...options,
    });
