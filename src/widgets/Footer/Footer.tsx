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

export const Footer = () => (
    <FooterRoot id="contacts">
        <Container>
            <FooterTitle>Контакты</FooterTitle>

            <FooterGrid>
                <FooterCol>
                    <FooterLabel>Адрес</FooterLabel>
                    <ContactRowStatic>
                        <Icon name="pin" size={18} />
                        <FooterLine>
                            {CONTACTS.address}
                            <br />
                            {CONTACTS.workingHours}
                        </FooterLine>
                    </ContactRowStatic>
                </FooterCol>

                <FooterCol>
                    <FooterLabel>Связь</FooterLabel>
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
                        <span>Telegram</span>
                    </ContactRow>
                    <ContactRow
                        href={CONTACTS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon name="instagram" size={18} />
                        <span>Instagram*</span>
                    </ContactRow>
                </FooterCol>

                <FooterCol>
                    <FooterLabel>Документы</FooterLabel>
                    <PolicyList>
                        <li>
                            <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
                                Политика обработки персональных данных
                            </PolicyLink>
                        </li>
                        <li>
                            <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
                                Политика конфиденциальности
                            </PolicyLink>
                        </li>
                    </PolicyList>
                </FooterCol>
            </FooterGrid>

            <Disclaimer>* — {CONTACTS.metaDisclaimer}</Disclaimer>
        </Container>
    </FooterRoot>
);
