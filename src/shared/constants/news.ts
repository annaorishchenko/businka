import { IMAGES } from "@/shared/assets/images";
import type { Locale } from "@/shared/i18n";

type LocalizedString = Record<Locale, string>;

export type NewsItem = {
    id: string;
    title: LocalizedString;
    date: string;
    excerpt: LocalizedString;
    image: string;
};

export const NEWS: NewsItem[] = [
    {
        id: "spring-collection",
        title: {
            ru: "Весенняя коллекция «Цветение»",
            en: "Spring collection ‘Blossom’",
        },
        date: "2026-04-12",
        excerpt: {
            ru: "Представляем новую серию украшений к весеннему сезону. Лёгкие колье и серьги в пастельных тонах.",
            en: "We introduce a new jewelry series for the spring season. Light necklaces and earrings in pastel shades.",
        },
        image: IMAGES.catalog.necklaceFlower,
    },
    {
        id: "master-class-open",
        title: {
            ru: "Открыта запись на мастер-класс",
            en: "Workshop registration is open",
        },
        date: "2026-03-20",
        excerpt: {
            ru: "В апреле проводим мастер-класс по плетению из бисера для начинающих. Записывайтесь по телефону.",
            en: "In April we are hosting a beginner workshop on beadwork. Book by phone.",
        },
        image: IMAGES.masterClass.large,
    },
    {
        id: "new-figurines",
        title: {
            ru: "Новая серия фигурок-брелоков",
            en: "New series of keychain figurines",
        },
        date: "2026-02-08",
        excerpt: {
            ru: "Пополнили линейку: пчёлка, попугай, лемур и пингвинчик уже в каталоге.",
            en: "The line has grown: a bee, a parrot, a lemur and a penguin are already in the catalog.",
        },
        image: IMAGES.figurines.bee,
    },
    {
        id: "rostov-pop-up",
        title: {
            ru: "Pop-up в Ростовском Арт-Молле",
            en: "Pop-up at the Rostov Art Mall",
        },
        date: "2026-01-15",
        excerpt: {
            ru: "Приходите познакомиться с украшениями вживую — будем 27-28 января.",
            en: "Come meet the jewelry in person — we will be there on January 27-28.",
        },
        image: IMAGES.catalog.braceletPink,
    },
];

const LOCALE_TAG: Record<Locale, string> = { ru: "ru-RU", en: "en-US" };

export const formatNewsDate = (iso: string, locale: Locale): string => {
    const date = new Date(iso);
    return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};
