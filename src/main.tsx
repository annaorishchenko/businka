import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@/app/providers/AppProvider";
import { App } from "@/app/App";

const rootEl = document.getElementById("root");

if (!rootEl) {
    throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
);
