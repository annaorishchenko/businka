import styled from "styled-components";
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

const AboutPage = () => (
    <>
        <HeroSection>
            <Container>
                <SectionTitle variant="script" align="center" eyebrow="О нас" as="h1">
                    Маленький бренд с большой душой
                </SectionTitle>

                <HeroGrid>
                    <StoryText>
                        <p>
                            «Бусинка» — это небольшой бренд украшений ручной работы. Мы
                            работаем в Ростове-на-Дону и каждое изделие создаём вручную из
                            чешского или японского бисера.
                        </p>
                        <p>
                            Каждое колье, серьги или браслет — это десятки и сотни мелких
                            бусин, продуманное сочетание цветов и кропотливая работа.
                            Поэтому два одинаковых украшения у нас не встречаются.
                        </p>
                        <p>
                            Мы делаем украшения, которые помогают подчеркнуть индивидуальность
                            и поднять настроение. Носите с удовольствием — а если что-то
                            нужно сделать на заказ, напишите нам в Telegram или позвоните.
                        </p>
                    </StoryText>
                    <StoryImg>
                        <img src={IMAGES.hero} alt="Украшение крупным планом" />
                    </StoryImg>
                </HeroGrid>
            </Container>
        </HeroSection>

        <Features />
    </>
);

export default AboutPage;
