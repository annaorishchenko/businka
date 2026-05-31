import type { CSSProperties } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/shared/i18n/useLocale";
import { SUPPORTED_LOCALES } from "@/shared/i18n";

const Root = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    background: ${({ theme }) => theme.colors.bgRose};
    border-radius: ${({ theme }) => theme.radius.round};
`;

const Button = styled.button<{ $active: boolean }>`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    border-radius: ${({ theme }) => theme.radius.round};
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.xs};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    letter-spacing: 0.1em;
    color: ${({ $active, theme }) =>
        $active ? theme.colors.textOnPrimary : theme.colors.accent};
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
    transition: all ${({ theme }) => theme.transition.fast};

    &:hover {
        color: ${({ $active, theme }) =>
            $active ? theme.colors.textOnPrimary : theme.colors.primary};
    }
`;

type Props = {
    className?: string;
    style?: CSSProperties;
};

export const LanguageSwitcher = ({ className, style }: Props) => {
    const { locale, setLocale } = useLocale();
    const { t } = useTranslation();

    return (
        <Root role="group" aria-label={t("lang.switchTo")} className={className} style={style}>
            {SUPPORTED_LOCALES.map((l) => (
                <Button
                    key={l}
                    type="button"
                    $active={locale === l}
                    aria-pressed={locale === l}
                    onClick={() => setLocale(l)}
                >
                    {t(`lang.${l}`)}
                </Button>
            ))}
        </Root>
    );
};
