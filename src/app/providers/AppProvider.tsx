import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";
import { GlobalStyles } from "../GlobalStyles";

type Props = {
    children: ReactNode;
};

export const AppProvider = ({ children }: Props) => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
);
