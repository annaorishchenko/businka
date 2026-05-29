import { IMAGES } from "@/shared/assets/images";

export type Product = {
    id: string;
    title: string;
    category: "earrings" | "rings" | "bracelets" | "trinkets" | "necklaces" | "figurines";
    image: string;
    description?: string;
};

export const PRODUCTS: Product[] = [
    {
        id: "earrings-classic",
        title: "Серьги «Кольца»",
        category: "earrings",
        image: IMAGES.catalog.earrings,
        description: "Классические серьги-кольца с плетением из чешского бисера.",
    },
    {
        id: "necklace-blue",
        title: "Колье «Незабудка»",
        category: "necklaces",
        image: IMAGES.catalog.necklaceBlue,
        description: "Воздушное колье в голубых тонах.",
    },
    {
        id: "bracelet-hand",
        title: "Браслет «Тепло»",
        category: "bracelets",
        image: IMAGES.catalog.braceletHand,
        description: "Лёгкий браслет на руку, плотное плетение.",
    },
    {
        id: "ring-handmade",
        title: "Кольцо «Цветок»",
        category: "rings",
        image: IMAGES.catalog.ring,
        description: "Кольцо ручной работы с цветочным мотивом.",
    },
    {
        id: "necklace-flower",
        title: "Колье «Розовый сад»",
        category: "necklaces",
        image: IMAGES.catalog.necklaceFlower,
        description: "Колье с объёмным цветком, на нежной леске.",
    },
    {
        id: "branches",
        title: "Серьги «Веточки»",
        category: "earrings",
        image: IMAGES.catalog.branches,
        description: "Растительные мотивы в зелёном бисере.",
    },
    {
        id: "bracelet-pink",
        title: "Браслет «Рассвет»",
        category: "bracelets",
        image: IMAGES.catalog.braceletPink,
        description: "Розовый браслет с нежным переливом.",
    },
    {
        id: "trinket-eye",
        title: "Брелок «Глазик»",
        category: "trinkets",
        image: IMAGES.catalog.eye,
        description: "Защитный амулет от сглаза.",
    },
    {
        id: "trinket-lemur",
        title: "Брелок «Лемур»",
        category: "trinkets",
        image: IMAGES.catalog.lemur,
    },
    {
        id: "trinket-penguin",
        title: "Брелок «Пингвинчик»",
        category: "trinkets",
        image: IMAGES.catalog.penguin,
    },
    {
        id: "figurine-bee",
        title: "Фигурка «Пчёлка»",
        category: "figurines",
        image: IMAGES.figurines.bee,
    },
    {
        id: "figurine-parrot",
        title: "Фигурка «Попугай»",
        category: "figurines",
        image: IMAGES.figurines.parrot,
    },
    {
        id: "figurine-shark",
        title: "Фигурка «Акула»",
        category: "figurines",
        image: IMAGES.figurines.shark,
    },
    {
        id: "figurine-skat",
        title: "Фигурка «Скат»",
        category: "figurines",
        image: IMAGES.figurines.ray,
    },
];

export const CATEGORY_LABELS: Record<Product["category"], string> = {
    earrings: "Серьги",
    rings: "Кольца",
    bracelets: "Браслеты",
    trinkets: "Брелоки",
    necklaces: "Колье",
    figurines: "Фигурки",
};
