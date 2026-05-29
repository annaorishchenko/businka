import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { Card } from "@/shared/components/Card";
import { SectionTitle } from "@/shared/components/SectionTitle";
import { PRODUCTS } from "@/shared/constants/products";

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
    const items = PRODUCTS.filter((p) => p.category !== "figurines").slice(4, 8);

    return (
        <Section>
            <Container>
                <SectionTitle variant="script" eyebrow="Популярное">
                    Выбирают чаще всего
                </SectionTitle>
                <Lead>Украшения, которые дополнят ваш образ и подарят ощущение праздника.</Lead>
                <Strip>
                    {items.map((p) => (
                        <Card key={p.id} image={p.image} title={p.title} />
                    ))}
                </Strip>
            </Container>
        </Section>
    );
};
