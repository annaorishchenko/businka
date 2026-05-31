import { IMAGES } from "@/shared/assets/images";
import type { Locale } from "@/shared/i18n";

type LocalizedString = Record<Locale, string>;

export type Product = {
    id: string;
    title: LocalizedString;
    category: "earrings" | "rings" | "bracelets" | "trinkets" | "necklaces" | "figurines";
    image: string;
    description?: LocalizedString;
};

export const PRODUCTS: Product[] = [
    {
        id: "earrings-classic",
        title: { ru: "Серьги «Кольца»", en: "‘Hoops’ earrings" },
        category: "earrings",
        image: IMAGES.catalog.earrings,
        description: {
            ru: "Классические серьги-кольца с плетением из чешского бисера.",
            en: "Classic hoop earrings woven from Czech seed beads.",
        },
    },
    {
        id: "necklace-blue",
        title: { ru: "Колье «Незабудка»", en: "‘Forget-me-not’ necklace" },
        category: "necklaces",
        image: IMAGES.catalog.necklaceBlue,
        description: { ru: "Воздушное колье в голубых тонах.", en: "An airy necklace in blue shades." },
    },
    {
        id: "bracelet-hand",
        title: { ru: "Браслет «Тепло»", en: "‘Warmth’ bracelet" },
        category: "bracelets",
        image: IMAGES.catalog.braceletHand,
        description: {
            ru: "Лёгкий браслет на руку, плотное плетение.",
            en: "A light bracelet with dense weaving.",
        },
    },
    {
        id: "ring-handmade",
        title: { ru: "Кольцо «Цветок»", en: "‘Flower’ ring" },
        category: "rings",
        image: IMAGES.catalog.ring,
        description: {
            ru: "Кольцо ручной работы с цветочным мотивом.",
            en: "A handmade ring with a floral motif.",
        },
    },
    {
        id: "necklace-flower",
        title: { ru: "Колье «Розовый сад»", en: "‘Pink Garden’ necklace" },
        category: "necklaces",
        image: IMAGES.catalog.necklaceFlower,
        description: {
            ru: "Колье с объёмным цветком, на нежной леске.",
            en: "A necklace with a 3D flower on a delicate cord.",
        },
    },
    {
        id: "branches",
        title: { ru: "Серьги «Веточки»", en: "‘Branches’ earrings" },
        category: "earrings",
        image: IMAGES.catalog.branches,
        description: {
            ru: "Растительные мотивы в зелёном бисере.",
            en: "Botanical motifs in green seed beads.",
        },
    },
    {
        id: "bracelet-pink",
        title: { ru: "Браслет «Рассвет»", en: "‘Dawn’ bracelet" },
        category: "bracelets",
        image: IMAGES.catalog.braceletPink,
        description: {
            ru: "Розовый браслет с нежным переливом.",
            en: "A pink bracelet with a delicate shimmer.",
        },
    },
    {
        id: "trinket-eye",
        title: { ru: "Брелок «Глазик»", en: "‘Evil Eye’ keychain" },
        category: "trinkets",
        image: IMAGES.catalog.eye,
        description: {
            ru: "Защитный амулет от сглаза.",
            en: "A protective charm against the evil eye.",
        },
    },
    {
        id: "trinket-lemur",
        title: { ru: "Брелок «Лемур»", en: "‘Lemur’ keychain" },
        category: "trinkets",
        image: IMAGES.catalog.lemur,
    },
    {
        id: "trinket-penguin",
        title: { ru: "Брелок «Пингвинчик»", en: "‘Penguin’ keychain" },
        category: "trinkets",
        image: IMAGES.catalog.penguin,
    },
    {
        id: "figurine-bee",
        title: { ru: "Фигурка «Пчёлка»", en: "‘Bee’ figurine" },
        category: "figurines",
        image: IMAGES.figurines.bee,
    },
    {
        id: "figurine-parrot",
        title: { ru: "Фигурка «Попугай»", en: "‘Parrot’ figurine" },
        category: "figurines",
        image: IMAGES.figurines.parrot,
    },
    {
        id: "figurine-shark",
        title: { ru: "Фигурка «Акула»", en: "‘Shark’ figurine" },
        category: "figurines",
        image: IMAGES.figurines.shark,
    },
    {
        id: "figurine-skat",
        title: { ru: "Фигурка «Скат»", en: "‘Stingray’ figurine" },
        category: "figurines",
        image: IMAGES.figurines.ray,
    },
];
