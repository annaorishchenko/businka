import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Button } from "@/shared/components/Button";
import { ROUTES } from "@/shared/constants/routes";

const Section = styled.section`
    min-height: 70vh;
    display: grid;
    place-items: center;
    text-align: center;
    padding-block: ${({ theme }) => theme.spacing["3xl"]};
`;

const Code = styled.h1`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.display};
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily.script};
    font-size: ${({ theme }) => theme.typography.size["3xl"]};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Lead = styled.p`
    max-width: 40ch;
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.size.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <Section>
            <Container>
                <Code>{t("notFound.code")}</Code>
                <Title>{t("notFound.title")}</Title>
                <Lead>{t("notFound.lead")}</Lead>
                <Button to={ROUTES.HOME}>{t("notFound.cta")}</Button>
            </Container>
        </Section>
    );
};

export default NotFoundPage;
