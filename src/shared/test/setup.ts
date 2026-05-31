import "@testing-library/jest-dom/vitest";
import i18n from "@/shared/i18n";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Tests run in jsdom where navigator.language is 'en-US' by default. Force
// Russian locale so existing assertions remain deterministic regardless of
// what the language-detector picked.
beforeEach(() => {
    if (i18n.language !== "ru") {
        void i18n.changeLanguage("ru");
    }
});

afterEach(() => {
    cleanup();
});
