import { useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Card } from "@/shared/components/Card";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { PRODUCTS, type Product } from "@/shared/constants/products";
import { useLocale } from "@/shared/i18n/useLocale";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const Chip = styled.button<{ $active: boolean }>`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    border-radius: ${({ theme }) => theme.radius.round};
    border: 1px solid
        ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.surface)};
    color: ${({ $active, theme }) =>
        $active ? theme.colors.textOnPrimary : theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.typography.size.sm};
    font-weight: ${({ theme }) => theme.typography.weight.medium};
    transition: all ${({ theme }) => theme.transition.fast};

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};

    ${({ theme }) => theme.media.desktop} {
        grid-template-columns: repeat(3, 1fr);
    }

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${({ theme }) => theme.media.mobile} {
        grid-template-columns: 1fr;
    }
`;

const CATEGORIES: Array<"all" | Product["category"]> = [
    "all",
    "earrings",
    "rings",
    "bracelets",
    "necklaces",
    "trinkets",
    "figurines",
];

const CatalogPage = () => {
    const [filter, setFilter] = useState<"all" | Product["category"]>("all");
    const { t } = useTranslation();
    const { locale } = useLocale();

    const filtered = useMemo(
        () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
        [filter],
    );

    return (
        <Section>
            <Container>
                <SectionTitle variant="serif" align="center" eyebrow={t("catalog.eyebrow")} as="h1">
                    {t("catalog.title")}
                </SectionTitle>

                <Filters role="tablist" aria-label={t("catalog.filters")}>
                    {CATEGORIES.map((value) => (
                        <Chip
                            key={value}
                            type="button"
                            $active={filter === value}
                            onClick={() => setFilter(value)}
                            aria-pressed={filter === value}
                        >
                            {value === "all" ? t("catalog.all") : t(`category.${value}`)}
                        </Chip>
                    ))}
                </Filters>

                <Grid>
                    {filtered.map((p) => (
                        <Card
                            key={p.id}
                            image={p.image}
                            title={p.title[locale]}
                            subtitle={p.description?.[locale] ?? t(`category.${p.category}`)}
                        />
                    ))}
                </Grid>
            </Container>
        </Section>
    );
};

export default CatalogPage;
