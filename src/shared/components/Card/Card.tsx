import styled from "styled-components";
import type { ReactNode } from "react";

type Props = {
    image?: string;
    imageAlt?: string;
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
};

const Root = styled.article`
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.lg};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow.sm};
    transition: transform ${({ theme }) => theme.transition.base},
        box-shadow ${({ theme }) => theme.transition.base};
    display: flex;
    flex-direction: column;
    cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.shadow.md};
    }
`;

const ImgWrap = styled.div`
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.bgRose};
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transition.slow};

    ${Root}:hover & {
        transform: scale(1.05);
    }
`;

const Body = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
    flex: 1;
`;

const Title = styled.h3`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.lg};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const Subtitle = styled.p`
    font-size: ${({ theme }) => theme.typography.size.sm};
    color: ${({ theme }) => theme.colors.textMuted};
`;

export const Card = ({ image, imageAlt, title, subtitle, children, onClick, className }: Props) => (
    <Root onClick={onClick} className={className}>
        {image && (
            <ImgWrap>
                <Img src={image} alt={imageAlt ?? title ?? ""} loading="lazy" />
            </ImgWrap>
        )}
        {(title || subtitle || children) && (
            <Body>
                {title && <Title>{title}</Title>}
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                {children}
            </Body>
        )}
    </Root>
);
