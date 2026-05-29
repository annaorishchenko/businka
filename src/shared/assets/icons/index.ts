import telegram from "./telegram.svg";
import instagram from "./instagram.svg";
import phone from "./phone.svg";
import email from "./email.svg";
import pin from "./pin.svg";
import menu from "./menu.svg";
import close from "./close.svg";

export const ICONS = {
    telegram,
    instagram,
    phone,
    email,
    pin,
    menu,
    close,
} as const;

export type IconName = keyof typeof ICONS;
