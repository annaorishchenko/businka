import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type BaseProps = {
    variant?: Variant;
    children: ReactNode;
};

const baseStyles = css<{ $variant: Variant }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.base};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    border-radius: ${({ theme }) => theme.radius.round};
    cursor: pointer;
    text-decoration: none;
    transition: all ${({ theme }) => theme.transition.base};
    border: 2px solid transparent;

    ${({ $variant, theme }) =>
        $variant === "primary" &&
        css`
            background: ${theme.colors.primary};
            color: ${theme.colors.textOnPrimary};
            box-shadow: ${theme.shadow.sm};

            &:hover {
                background: ${theme.colors.primaryHover};
                box-shadow: ${theme.shadow.md};
                transform: translateY(-1px);
            }
        `}

    ${({ $variant, theme }) =>
        $variant === "outline" &&
        css`
            background: transparent;
            color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};

            &:hover {
                background: ${theme.colors.primary};
                color: ${theme.colors.textOnPrimary};
            }
        `}

    ${({ $variant, theme }) =>
        $variant === "ghost" &&
        css`
            background: transparent;
            color: ${theme.colors.accent};

            &:hover {
                color: ${theme.colors.primary};
            }
        `}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StyledButton = styled.button<{ $variant: Variant }>`
    ${baseStyles}
`;

const StyledAnchor = styled.a<{ $variant: Variant }>`
    ${baseStyles}
`;

const StyledLink = styled(Link)<{ $variant: Variant }>`
    ${baseStyles}
`;

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type LinkProps = BaseProps & { to: string; href?: undefined } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type AnchorProps = BaseProps & { href: string; to?: undefined } & AnchorHTMLAttributes<HTMLAnchorElement>;

export type Props = ButtonProps | LinkProps | AnchorProps;

export const Button = ({ variant = "primary", children, ...rest }: Props) => {
    if ("to" in rest && rest.to !== undefined) {
        const { to, ...anchorRest } = rest;
        return (
            <StyledLink to={to} $variant={variant} {...anchorRest}>
                {children}
            </StyledLink>
        );
    }
    if ("href" in rest && rest.href !== undefined) {
        return (
            <StyledAnchor $variant={variant} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </StyledAnchor>
        );
    }
    return (
        <StyledButton $variant={variant} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </StyledButton>
    );
};
