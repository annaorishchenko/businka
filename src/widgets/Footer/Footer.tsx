import { useTranslation } from "react-i18next";
import { Container } from "@/shared/components/Container";
import { Icon } from "@/shared/components/Icon";
import { CONTACTS } from "@/shared/constants/contacts";
import {
    FooterRoot,
    FooterTitle,
    FooterGrid,
    FooterCol,
    ContactRow,
    ContactRowStatic,
    FooterLabel,
    FooterLine,
    PolicyList,
    PolicyLink,
    Disclaimer,
} from "./Footer.styled";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <FooterRoot id="contacts">
            <Container>
                <FooterTitle>{t("footer.title")}</FooterTitle>

                <FooterGrid>
                    <FooterCol>
                        <FooterLabel>{t("footer.address")}</FooterLabel>
                        <ContactRowStatic>
                            <Icon name="pin" size={18} />
                            <FooterLine>
                                {t("footer.addressValue")}
                                <br />
                                {t("footer.workingHours")}
                            </FooterLine>
                        </ContactRowStatic>
                    </FooterCol>

                    <FooterCol>
                        <FooterLabel>{t("footer.contact")}</FooterLabel>
                        <ContactRow href={`tel:${CONTACTS.phone}`}>
                            <Icon name="phone" size={18} />
                            <span>{CONTACTS.phoneFormatted}</span>
                        </ContactRow>
                        <ContactRow href={`mailto:${CONTACTS.email}`}>
                            <Icon name="email" size={18} />
                            <span>{CONTACTS.email}</span>
                        </ContactRow>
                        <ContactRow
                            href={CONTACTS.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="telegram" size={18} />
                            <span>{t("footer.telegram")}</span>
                        </ContactRow>
                        <ContactRow
                            href={CONTACTS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon name="instagram" size={18} />
                            <span>{t("footer.instagram")}</span>
                        </ContactRow>
                    </FooterCol>

                    <FooterCol>
                        <FooterLabel>{t("footer.docs")}</FooterLabel>
                        <PolicyList>
                            <li>
                                <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
                                    {t("footer.policyData")}
                                </PolicyLink>
                            </li>
                            <li>
                                <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
                                    {t("footer.policyConfidentiality")}
                                </PolicyLink>
                            </li>
                        </PolicyList>
                    </FooterCol>
                </FooterGrid>

                <Disclaimer>{t("footer.metaDisclaimer")}</Disclaimer>
            </Container>
        </FooterRoot>
    );
};
