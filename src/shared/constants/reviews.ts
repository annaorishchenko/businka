import type { Locale } from "@/shared/i18n";

type LocalizedString = Record<Locale, string>;

export type Review = {
    id: string;
    name: LocalizedString;
    city?: LocalizedString;
    rating: 1 | 2 | 3 | 4 | 5;
    text: LocalizedString;
    date: string;
};

export const REVIEWS: Review[] = [
    {
        id: "r1",
        name: { ru: "Анна", en: "Anna" },
        city: { ru: "Ростов-на-Дону", en: "Rostov-on-Don" },
        rating: 5,
        text: {
            ru: "Заказывала колье «Незабудка» — пришло как на фото, упаковка нежная, каждая бусина на месте. Спасибо!",
            en: "I ordered the ‘Forget-me-not’ necklace — it arrived exactly as in the photo, the packaging is delicate and every bead is in place. Thank you!",
        },
        date: "2026-04-08",
    },
    {
        id: "r2",
        name: { ru: "Марина", en: "Marina" },
        city: { ru: "Краснодар", en: "Krasnodar" },
        rating: 5,
        text: {
            ru: "Очень понравились серьги-веточки. Лёгкие, не давят, дочери подарила — она в восторге.",
            en: "I really liked the branch earrings. They are light, don’t pull the ear, I gave them to my daughter — she is delighted.",
        },
        date: "2026-03-15",
    },
    {
        id: "r3",
        name: { ru: "Екатерина", en: "Ekaterina" },
        rating: 4,
        text: {
            ru: "Браслет красивый, плетение аккуратное. Снимаю звезду только за то, что доставка немного задержалась.",
            en: "The bracelet is beautiful and the weaving is neat. I take a star off only because the delivery was a bit delayed.",
        },
        date: "2026-02-22",
    },
    {
        id: "r4",
        name: { ru: "Ольга", en: "Olga" },
        city: { ru: "Таганрог", en: "Taganrog" },
        rating: 5,
        text: {
            ru: "Брелок-пингвинчик стал любимым подарком племяннице. Хочу теперь себе глазик от сглаза.",
            en: "The penguin keychain became my niece’s favorite gift. Now I want an evil eye charm for myself.",
        },
        date: "2026-01-30",
    },
    {
        id: "r5",
        name: { ru: "Дарья", en: "Daria" },
        city: { ru: "Ростов-на-Дону", en: "Rostov-on-Don" },
        rating: 5,
        text: {
            ru: "Была на мастер-классе — атмосфера тёплая, всё объяснили, унесла свой первый браслет. Спасибо Бусинке!",
            en: "I attended the workshop — the atmosphere was warm, everything was explained, and I took home my first bracelet. Thanks Businka!",
        },
        date: "2025-12-12",
    },
    {
        id: "r6",
        name: { ru: "Юлия", en: "Yulia" },
        rating: 5,
        text: {
            ru: "Заказывала кольцо на заказ под своё платье — попали в цвет идеально.",
            en: "I ordered a custom ring to match my dress — the color was an absolute match.",
        },
        date: "2025-11-04",
    },
];
