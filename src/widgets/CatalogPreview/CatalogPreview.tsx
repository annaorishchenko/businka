import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { ROUTES } from "@/shared/constants/routes";
import { PRODUCTS } from "@/shared/constants/products";
import { useLocale } from "@/shared/i18n/useLocale";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const Top = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;
    margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const Lead = styled.p`
    max-width: 36ch;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.size.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
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

const Footer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing["2xl"]};
`;

export const CatalogPreview = () => {
    const { t } = useTranslation();
    const { locale } = useLocale();
    const preview = PRODUCTS.slice(0, 8);

    return (
        <Section>
            <Container>
                <Top>
                    <div>
                        <SectionTitle variant="script" eyebrow={t("catalogPreview.eyebrow")}>
                            {t("catalogPreview.title")}
                        </SectionTitle>
                        <Lead>{t("catalogPreview.lead")}</Lead>
                    </div>
                    <Button to={ROUTES.CATALOG} variant="outline">
                        {t("catalogPreview.viewAll")}
                    </Button>
                </Top>
                <Grid>
                    {preview.map((p) => (
                        <Card
                            key={p.id}
                            image={p.image}
                            title={p.title[locale]}
                            subtitle={p.description?.[locale]}
                        />
                    ))}
                </Grid>
                <Footer>
                    <Button to={ROUTES.CATALOG}>{t("catalogPreview.goToCatalog")}</Button>
                </Footer>
            </Container>
        </Section>
    );
};
