import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { NEWS, formatNewsDate } from "@/shared/constants/news";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
`;

const Article = styled.article`
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.sm};
    transition: box-shadow ${({ theme }) => theme.transition.base};

    &:hover {
        box-shadow: ${({ theme }) => theme.shadow.md};
    }

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4 / 3;
    background: ${({ theme }) => theme.colors.bgRose};
`;

const Body = styled.div`
    padding: ${({ theme }) => theme.spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const Date_ = styled.time`
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const Title = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.xl};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
`;

const Excerpt = styled.p`
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const NewsPage = () => (
    <Section>
        <Container>
            <SectionTitle variant="script" align="center" eyebrow="Новости" as="h1">
                О чём мы пишем
            </SectionTitle>

            <List>
                {NEWS.map((item) => (
                    <Article key={item.id}>
                        <Img src={item.image} alt={item.title} loading="lazy" />
                        <Body>
                            <Date_ dateTime={item.date}>{formatNewsDate(item.date)}</Date_>
                            <Title>{item.title}</Title>
                            <Excerpt>{item.excerpt}</Excerpt>
                        </Body>
                    </Article>
                ))}
            </List>
        </Container>
    </Section>
);

export default NewsPage;
