import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Card } from "@/shared/components/Card";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { PRODUCTS } from "@/shared/constants/products";
import { useLocale } from "@/shared/i18n/useLocale";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const Lead = styled.p`
    max-width: 48ch;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const Strip = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${({ theme }) => theme.media.mobile} {
        grid-template-columns: 1fr;
    }
`;

export const Popular = () => {
    const { t } = useTranslation();
    const { locale } = useLocale();
    const items = PRODUCTS.filter((p) => p.category !== "figurines").slice(4, 8);

    return (
        <Section>
            <Container>
                <SectionTitle variant="script" eyebrow={t("popular.eyebrow")}>
                    {t("popular.title")}
                </SectionTitle>
                <Lead>{t("popular.lead")}</Lead>
                <Strip>
                    {items.map((p) => (
                        <Card key={p.id} image={p.image} title={p.title[locale]} />
                    ))}
                </Strip>
            </Container>
        </Section>
    );
};
