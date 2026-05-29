import { IMAGES } from "@/shared/assets/images";

export type NewsItem = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
};

export const NEWS: NewsItem[] = [
    {
        id: "spring-collection",
        title: "Весенняя коллекция «Цветение»",
        date: "2026-04-12",
        excerpt:
            "Представляем новую серию украшений к весеннему сезону. Лёгкие колье и серьги в пастельных тонах.",
        image: IMAGES.catalog.necklaceFlower,
    },
    {
        id: "master-class-open",
        title: "Открыта запись на мастер-класс",
        date: "2026-03-20",
        excerpt:
            "В апреле проводим мастер-класс по плетению из бисера для начинающих. Записывайтесь по телефону.",
        image: IMAGES.masterClass.large,
    },
    {
        id: "new-figurines",
        title: "Новая серия фигурок-брелоков",
        date: "2026-02-08",
        excerpt: "Пополнили линейку: пчёлка, попугай, лемур и пингвинчик уже в каталоге.",
        image: IMAGES.figurines.bee,
    },
    {
        id: "rostov-pop-up",
        title: "Pop-up в Ростовском Арт-Молле",
        date: "2026-01-15",
        excerpt: "Приходите познакомиться с украшениями вживую — будем 27-28 января.",
        image: IMAGES.catalog.braceletPink,
    },
];

export const formatNewsDate = (iso: string): string => {
    const d = new Date(iso);
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
