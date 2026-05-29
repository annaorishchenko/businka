import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderRoot = styled.header`
    position: relative;
    width: 100%;
    background: ${({ theme }) => theme.colors.bgCream};
    padding-top: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    z-index: ${({ theme }) => theme.zIndex.header};
`;

export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xl};
`;

export const LogoLink = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;

    img {
        height: 64px;
        width: auto;
    }

    ${({ theme }) => theme.media.mobile} {
        img {
            height: 48px;
        }
    }
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};

    ${({ theme }) => theme.media.mobileWide} {
        display: none;
    }
`;

export const NavItem = styled(NavLink)`
    position: relative;
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.size.base};
    font-weight: ${({ theme }) => theme.typography.weight.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: none;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    transition: color ${({ theme }) => theme.transition.fast};

    &::before {
        content: "•";
        margin-right: ${({ theme }) => theme.spacing.sm};
        color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const BurgerButton = styled.button`
    display: none;
    color: ${({ theme }) => theme.colors.accent};

    ${({ theme }) => theme.media.mobileWide} {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
    }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme.colors.bgCream};
    z-index: ${({ theme }) => theme.zIndex.modal};
    transform: translateX(100%);
    transition: transform ${({ theme }) => theme.transition.base};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.xl};

    ${({ $open }) =>
        $open &&
        css`
            transform: translateX(0);
        `}
`;

export const MobileMenuHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

export const MobileNavList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

export const MobileNavItem = styled(NavLink)`
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.size.xl};
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: none;
    padding: ${({ theme }) => theme.spacing.md} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &.active {
        color: ${({ theme }) => theme.colors.primary};
    }
`;
