import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { ROUTES } from "@/shared/constants/routes";
import { PRODUCTS } from "@/shared/constants/products";

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
    const preview = PRODUCTS.slice(0, 8);

    return (
        <Section>
            <Container>
                <Top>
                    <div>
                        <SectionTitle variant="script" eyebrow="Каталог">
                            Удивляй
                        </SectionTitle>
                        <Lead>
                            Серьги, кольца, браслеты и милые брелоки. Каждая бусина —
                            ручная работа из чешского или японского бисера.
                        </Lead>
                    </div>
                    <Button to={ROUTES.CATALOG} variant="outline">
                        Весь каталог
                    </Button>
                </Top>
                <Grid>
                    {preview.map((p) => (
                        <Card key={p.id} image={p.image} title={p.title} subtitle={p.description} />
                    ))}
                </Grid>
                <Footer>
                    <Button to={ROUTES.CATALOG}>Перейти в каталог</Button>
                </Footer>
            </Container>
        </Section>
    );
};
