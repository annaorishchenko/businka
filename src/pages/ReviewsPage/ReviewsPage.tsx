import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { REVIEWS, type Review } from "@/shared/constants/reviews";
import { formatNewsDate } from "@/shared/constants/news";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
    }
`;

const Item = styled.article`
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.lg};
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const Head = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
`;

const Author = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const Name = styled.h3`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.lg};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const City = styled.span`
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.textMuted};
`;

const Date_ = styled.time`
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.size.xs};
    color: ${({ theme }) => theme.colors.accent};
`;

const Stars = styled.div`
    display: flex;
    gap: 2px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.size.lg};
    letter-spacing: 2px;
`;

const Text = styled.p`
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const renderStars = (rating: Review["rating"]) => "★".repeat(rating) + "☆".repeat(5 - rating);

const ReviewsPage = () => (
    <Section>
        <Container>
            <SectionTitle variant="script" align="center" eyebrow="Отзывы" as="h1">
                Что говорят клиенты
            </SectionTitle>

            <Grid>
                {REVIEWS.map((r) => (
                    <Item key={r.id}>
                        <Head>
                            <Author>
                                <Name>{r.name}</Name>
                                {r.city && <City>{r.city}</City>}
                            </Author>
                            <Date_ dateTime={r.date}>{formatNewsDate(r.date)}</Date_>
                        </Head>
                        <Stars aria-label={`Оценка: ${r.rating} из 5`}>{renderStars(r.rating)}</Stars>
                        <Text>{r.text}</Text>
                    </Item>
                ))}
            </Grid>
        </Container>
    </Section>
);

export default ReviewsPage;
