import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./index";

export const useLocale = (): { locale: Locale; setLocale: (l: Locale) => void } => {
    const { i18n } = useTranslation();
    const current = isLocale(i18n.resolvedLanguage)
        ? i18n.resolvedLanguage
        : isLocale(i18n.language)
          ? i18n.language
          : DEFAULT_LOCALE;
    return {
        locale: current,
        setLocale: (l: Locale) => {
            void i18n.changeLanguage(l);
            if (typeof document !== "undefined") {
                document.documentElement.lang = l;
            }
        },
    };
};
