import styled from "styled-components";
import type { ReactNode } from "react";

type Variant = "display" | "serif" | "script";
type Align = "left" | "center" | "right";

type Props = {
    children: ReactNode;
    variant?: Variant;
    align?: Align;
    as?: "h1" | "h2" | "h3";
    eyebrow?: string;
    className?: string;
};

const Wrap = styled.div<{ $align: Align }>`
    text-align: ${({ $align }) => $align};
    margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const Eyebrow = styled.span`
    display: inline-block;
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.sm};
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h2<{ $variant: Variant }>`
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ $variant, theme }) =>
        $variant === "script"
            ? theme.typography.fontFamily.script
            : $variant === "serif"
              ? theme.typography.fontFamily.serif
              : theme.typography.fontFamily.display};
    font-size: ${({ $variant, theme }) =>
        $variant === "display" ? theme.typography.size["3xl"] : theme.typography.size["2xl"]};
    font-weight: ${({ $variant, theme }) =>
        $variant === "script" ? theme.typography.weight.regular : theme.typography.weight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const SectionTitle = ({
    children,
    variant = "serif",
    align = "left",
    as = "h2",
    eyebrow,
    className,
}: Props) => (
    <Wrap $align={align} className={className}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title as={as} $variant={variant}>
            {children}
        </Title>
    </Wrap>
);
