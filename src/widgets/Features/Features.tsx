import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { SectionTitle } from "@/shared/components/SectionTitle";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
    background: ${({ theme }) => theme.colors.bgRose};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: ${({ theme }) => theme.spacing["3xl"]};
    align-items: start;

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
    }
`;

const Intro = styled.p`
    font-size: ${({ theme }) => theme.typography.size.md};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const List = styled.ol`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
    counter-reset: feature-counter;
`;

const Item = styled.li`
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;

    &::before {
        counter-increment: feature-counter;
        content: counter(feature-counter);
        font-family: ${({ theme }) => theme.typography.fontFamily.serif};
        font-size: 3rem;
        font-weight: ${({ theme }) => theme.typography.weight.bold};
        color: ${({ theme }) => theme.colors.primary};
        line-height: 1;
    }
`;

const ItemTitle = styled.h3`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.xl};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const FEATURES = [
    "Универсальный стиль",
    "Ручная работа",
    "Качественные материалы",
];

export const Features = () => (
    <Section>
        <Container>
            <Grid>
                <div>
                    <SectionTitle variant="script">Почему мы?</SectionTitle>
                    <Intro>
                        «Бусинка» — небольшой бренд, каждый товар которого создаётся
                        вручную. Мы создаём украшения из бисера и бусин, чтобы помочь тебе
                        выразить себя через детали.
                    </Intro>
                </div>
                <List>
                    {FEATURES.map((f) => (
                        <Item key={f}>
                            <ItemTitle>{f}</ItemTitle>
                        </Item>
                    ))}
                </List>
            </Grid>
        </Container>
    </Section>
);
