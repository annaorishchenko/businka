import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { Features } from "@/widgets/Features";
import { IMAGES } from "@/shared/assets/images";

const HeroSection = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const HeroGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing["3xl"]};
    align-items: center;

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
    }
`;

const StoryText = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.typography.size.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const StoryImg = styled.div`
    aspect-ratio: 4 / 5;
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.lg};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const AboutPage = () => {
    const { t } = useTranslation();
    const story = t("about.story", { returnObjects: true }) as string[];
    return (
        <>
            <HeroSection>
                <Container>
                    <SectionTitle
                        variant="script"
                        align="center"
                        eyebrow={t("about.eyebrow")}
                        as="h1"
                    >
                        {t("about.title")}
                    </SectionTitle>

                    <HeroGrid>
                        <StoryText>
                            {story.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </StoryText>
                        <StoryImg>
                            <img src={IMAGES.hero} alt={t("about.photoAlt")} />
                        </StoryImg>
                    </HeroGrid>
                </Container>
            </HeroSection>

            <Features />
        </>
    );
};

export default AboutPage;
