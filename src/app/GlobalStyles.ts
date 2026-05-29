import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    html {
        font-size: 16px;
        scroll-behavior: smooth;
        text-size-adjust: 100%;
    }

    body {
        font-family: ${({ theme }) => theme.typography.fontFamily.display};
        font-weight: ${({ theme }) => theme.typography.weight.regular};
        font-size: ${({ theme }) => theme.typography.size.base};
        line-height: ${({ theme }) => theme.typography.lineHeight.normal};
        color: ${({ theme }) => theme.colors.textPrimary};
        background-color: ${({ theme }) => theme.colors.bgCream};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
        padding: 0;
    }

    img, svg, video {
        display: block;
        max-width: 100%;
        height: auto;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: ${({ theme }) => theme.typography.weight.regular};
    }

    p {
        margin: 0;
    }

    ul, ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.primary};
        outline-offset: 2px;
    }
`;
