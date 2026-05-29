import styled from "styled-components";
import { Container } from "@/shared/components/Container";
import { Button } from "@/shared/components/Button";
import { IMAGES } from "@/shared/assets/images";
import { CONTACTS } from "@/shared/constants/contacts";

const Section = styled.section`
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.bgRose} 0%,
        ${({ theme }) => theme.colors.bgCream} 100%
    );
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: ${({ theme }) => theme.spacing["3xl"]};
    align-items: center;

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr;
    }
`;

const Img = styled.div`
    aspect-ratio: 4 / 3;
    border-radius: ${({ theme }) => theme.radius.xl};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.md};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const Eyebrow = styled.p`
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.sm};
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size["3xl"]};
    color: ${({ theme }) => theme.colors.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const Lead = styled.p`
    font-size: ${({ theme }) => theme.typography.size.md};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
    max-width: 48ch;
`;

const Actions = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
`;

export const MasterClass = () => (
    <Section id="master-class">
        <Container>
            <Grid>
                <Img>
                    <img src={IMAGES.masterClass.large} alt="Мастер-класс по украшениям из бисера" />
                </Img>
                <Body>
                    <Eyebrow>Мастер-класс</Eyebrow>
                    <Title>Создаём красоту своими руками</Title>
                    <Lead>
                        Приглашаем на мастер-класс по плетению украшений из бисера.
                        Расскажем о техниках, поделимся материалами и поможем сделать своё
                        первое украшение.
                    </Lead>
                    <Actions>
                        <Button href={`tel:${CONTACTS.phone}`}>Записаться по телефону</Button>
                        <Button
                            variant="outline"
                            href={`mailto:${CONTACTS.email}?subject=Запись на мастер-класс`}
                        >
                            Написать на email
                        </Button>
                    </Actions>
                </Body>
            </Grid>
        </Container>
    </Section>
);
