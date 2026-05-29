import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-left: ${({ theme }) => theme.spacing.xl};
    padding-right: ${({ theme }) => theme.spacing.xl};

    ${({ theme }) => theme.media.mobileWide} {
        padding-left: ${({ theme }) => theme.spacing.lg};
        padding-right: ${({ theme }) => theme.spacing.lg};
    }

    ${({ theme }) => theme.media.mobile} {
        padding-left: ${({ theme }) => theme.spacing.md};
        padding-right: ${({ theme }) => theme.spacing.md};
    }
`;
