import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Button } from "@/shared/components/Button";
import { IMAGES } from "@/shared/assets/images";
import { ROUTES } from "@/shared/constants/routes";

const Section = styled.section`
    position: relative;
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.bgCream} 0%,
        ${({ theme }) => theme.colors.bgRose} 100%
    );
    overflow: hidden;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: ${({ theme }) => theme.spacing["3xl"]};
    align-items: center;

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
        text-align: center;
    }
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const Brand = styled.p`
    font-family: ${({ theme }) => theme.typography.fontFamily.script};
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1;
`;

const Tagline = styled.p`
    font-size: ${({ theme }) => theme.typography.size.md};
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 32ch;
`;

const Headline = styled.h1`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.hero};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    white-space: pre-line;
`;

const Actions = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;

    ${({ theme }) => theme.media.tablet} {
        justify-content: center;
    }
`;

const HeroImage = styled.div`
    position: relative;
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.lg};
    aspect-ratio: 1 / 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Hero = () => {
    const { t } = useTranslation();
    return (
        <Section>
            <Container>
                <Grid>
                    <Text>
                        <Brand>{t("brand.name")}</Brand>
                        <Headline>{t("hero.headline")}</Headline>
                        <Tagline>{t("hero.tagline")}</Tagline>
                        <Actions>
                            <Button to={ROUTES.CATALOG}>{t("hero.ctaCatalog")}</Button>
                            <Button variant="outline" href="#contacts">
                                {t("hero.ctaContact")}
                            </Button>
                        </Actions>
                    </Text>
                    <HeroImage>
                        <img src={IMAGES.hero} alt={t("hero.photoAlt")} />
                    </HeroImage>
                </Grid>
            </Container>
        </Section>
    );
};
