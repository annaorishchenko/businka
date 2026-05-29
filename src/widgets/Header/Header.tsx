import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@/shared/components/Container";
import { Icon } from "@/shared/components/Icon";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routes";
import { DECOR } from "@/shared/assets/decor";
import {
    HeaderRoot,
    HeaderInner,
    LogoLink,
    Nav,
    NavItem,
    BurgerButton,
    MobileMenu,
    MobileMenuHeader,
    MobileNavList,
    MobileNavItem,
} from "./Header.styled";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <HeaderRoot>
            <Container>
                <HeaderInner>
                    <LogoLink to={ROUTES.HOME} aria-label="Бусинка — на главную">
                        <img src={DECOR.logo} alt="Бусинка" />
                    </LogoLink>

                    <Nav aria-label="Основная навигация">
                        {NAV_ITEMS.map(({ to, label }) => (
                            <NavItem key={to} to={to}>
                                {label}
                            </NavItem>
                        ))}
                    </Nav>

                    <BurgerButton
                        type="button"
                        aria-label="Открыть меню"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(true)}
                    >
                        <Icon name="menu" size={28} />
                    </BurgerButton>
                </HeaderInner>
            </Container>

            <MobileMenu $open={isOpen} aria-hidden={!isOpen}>
                <Container>
                    <MobileMenuHeader>
                        <LogoLink to={ROUTES.HOME}>
                            <img src={DECOR.logo} alt="Бусинка" />
                        </LogoLink>
                        <BurgerButton
                            type="button"
                            aria-label="Закрыть меню"
                            onClick={() => setIsOpen(false)}
                            style={{ display: "inline-flex" }}
                        >
                            <Icon name="close" size={28} />
                        </BurgerButton>
                    </MobileMenuHeader>

                    <MobileNavList>
                        {NAV_ITEMS.map(({ to, label }) => (
                            <MobileNavItem key={to} to={to}>
                                {label}
                            </MobileNavItem>
                        ))}
                    </MobileNavList>
                </Container>
            </MobileMenu>
        </HeaderRoot>
    );
};
