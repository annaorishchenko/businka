import styled from "styled-components";

export const LayoutRoot = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.bgCream};
    position: relative;
    overflow-x: hidden;
`;

export const Main = styled.main`
    flex: 1;
    width: 100%;
    position: relative;
`;

export const SideDecor = styled.aside<{ $side: "left" | "right" }>`
    position: absolute;
    top: 120px;
    ${({ $side }) => ($side === "left" ? "left: 0" : "right: 0")};
    width: 80px;
    height: 480px;
    pointer-events: none;
    opacity: 0.85;
    z-index: ${({ theme }) => theme.zIndex.decor};

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        ${({ $side }) => ($side === "right" ? "transform: scaleX(-1)" : "")};
    }

    ${({ theme }) => theme.media.desktop} {
        width: 56px;
        height: 360px;
    }

    ${({ theme }) => theme.media.tablet} {
        display: none;
    }
`;
