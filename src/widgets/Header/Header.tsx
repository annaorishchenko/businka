import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Icon } from "@/shared/components/Icon";
import { NAV_ITEMS, ROUTES } from "@/shared/constants/routes";
import { DECOR } from "@/shared/assets/decor";
import { LanguageSwitcher } from "@/widgets/LanguageSwitcher";
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
    HeaderRight,
} from "./Header.styled";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

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
                    <LogoLink to={ROUTES.HOME} aria-label={t("brand.logoAlt")}>
                        <img src={DECOR.logo} alt={t("brand.name")} />
                    </LogoLink>

                    <HeaderRight>
                        <Nav aria-label={t("nav.ariaLabel")}>
                            {NAV_ITEMS.map(({ to, labelKey }) => (
                                <NavItem key={to} to={to}>
                                    {t(labelKey)}
                                </NavItem>
                            ))}
                        </Nav>

                        <LanguageSwitcher />

                        <BurgerButton
                            type="button"
                            aria-label={t("nav.open")}
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(true)}
                        >
                            <Icon name="menu" size={28} />
                        </BurgerButton>
                    </HeaderRight>
                </HeaderInner>
            </Container>

            <MobileMenu $open={isOpen} aria-hidden={!isOpen}>
                <Container>
                    <MobileMenuHeader>
                        <LogoLink to={ROUTES.HOME}>
                            <img src={DECOR.logo} alt={t("brand.name")} />
                        </LogoLink>
                        <BurgerButton
                            type="button"
                            aria-label={t("nav.close")}
                            onClick={() => setIsOpen(false)}
                            style={{ display: "inline-flex" }}
                        >
                            <Icon name="close" size={28} />
                        </BurgerButton>
                    </MobileMenuHeader>

                    <MobileNavList>
                        {NAV_ITEMS.map(({ to, labelKey }) => (
                            <MobileNavItem key={to} to={to}>
                                {t(labelKey)}
                            </MobileNavItem>
                        ))}
                    </MobileNavList>

                    <LanguageSwitcher style={{ marginTop: 24 }} />
                </Container>
            </MobileMenu>
        </HeaderRoot>
    );
};
