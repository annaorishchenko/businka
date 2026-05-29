import styled from "styled-components";

export const FooterRoot = styled.footer`
    width: 100%;
    background: linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.bgCream} 0%,
        ${({ theme }) => theme.colors.bgRose} 100%
    );
    padding-top: ${({ theme }) => theme.spacing["3xl"]};
    padding-bottom: ${({ theme }) => theme.spacing["2xl"]};
    margin-top: auto;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FooterTitle = styled.h2`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size["2xl"]};
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: ${({ theme }) => theme.spacing["2xl"]};

    ${({ theme }) => theme.media.tablet} {
        grid-template-columns: 1fr 1fr;
    }

    ${({ theme }) => theme.media.mobileWide} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing.xl};
    }
`;

export const FooterCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

export const ContactRow = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const ContactRowStatic = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FooterLabel = styled.span`
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.sm};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const FooterLine = styled.div`
    font-size: ${({ theme }) => theme.typography.size.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;

export const PolicyList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
`;

export const PolicyLink = styled.a`
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    text-decoration: underline;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const Disclaimer = styled.p`
    margin-top: ${({ theme }) => theme.spacing.xl};
    padding-top: ${({ theme }) => theme.spacing.lg};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.typography.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: ${({ theme }) => theme.typography.lineHeight.loose};
`;
