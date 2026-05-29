# 03. Дизайн-система — Бусинка

## Оглавление

1. [Принципы](#принципы)
2. [Цветовая палитра](#цветовая-палитра)
3. [Типографика](#типографика)
4. [Шкала отступов](#шкала-отступов)
5. [Брейкпойнты и адаптивность](#брейкпойнты-и-адаптивность)
6. [Сетка и контейнеры](#сетка-и-контейнеры)
7. [Компоненты](#компоненты)
8. [Иконография](#иконография)
9. [Тени и скругления](#тени-и-скругления)
10. [Анимации](#анимации)

---

## Принципы

1. **Тёплая нейтральность.** Палитра построена на кремовых и пыльно-розовых оттенках. Холодные цвета используются только как служебные.
2. **Воздух важнее декора.** Большие отступы между блоками. Минимум линий, рамок и теней.
3. **Десктоп-first.** Базовая разметка проектируется под 1366–1920, мобайл — упрощённая версия.
4. **Типографика — главный декор.** Сочетание гротеска и антиквы создаёт ритм.
5. **Один CTA на экран.** На каждой секции — одно понятное действие.

---

## Цветовая палитра

Все цвета вынесены в `src/shared/theme/colors.ts` и доступны через `theme.colors.*`.

| Токен | HEX | Прозрачность | Назначение |
|---|---|---|---|
| `bgPrimary` | `#FEFBEA` | 100 % | Основной фон сайта (кремовый) |
| `bgSoft` | `#FDE6DB` | 100 % | Вторичный фон секций, фон карточек, alt-блоки |
| `accentBronze` | `#9B8E5A` | 100 % | Основной текст, бронзово-оливковый акцент |
| `accentPinkPrimary` | `#D58D98` | 100 % | Главный CTA, активные ссылки |
| `accentPinkSoft` | `#DC919C` | 100 % | Заголовки, hover-состояния CTA |
| `white` | `#FFFFFF` | 100 % | Фон карточек на цветной подложке, текст на тёмном |
| `coolGrayMuted` | `#D0D5E2` | 60 % | Бордеры, разделители, технические элементы |
| `pinkOverlay` | `#FCA7AF` | 32 % | Полупрозрачные подложки, hover-эффекты |

### Применение по ролям

| Роль | Цвет |
|---|---|
| Текст основной | `accentBronze` |
| Текст заголовка | `accentPinkSoft` |
| Текст на CTA-кнопке | `white` |
| Фон страницы | `bgPrimary` |
| Фон секции (alt) | `bgSoft` |
| Фон карточки | `white` |
| Бордер карточки | `coolGrayMuted` (60 %) |
| Кнопка primary | `accentPinkPrimary` |
| Кнопка primary hover | `accentPinkSoft` |
| Disabled | `coolGrayMuted` |

### Пример объекта `colors.ts`

```typescript
// src/shared/theme/colors.ts
export const colors = {
    bgPrimary: "#FEFBEA",
    bgSoft: "#FDE6DB",
    accentBronze: "#9B8E5A",
    accentPinkPrimary: "#D58D98",
    accentPinkSoft: "#DC919C",
    white: "#FFFFFF",
    coolGrayMuted: "rgba(208, 213, 226, 0.6)",
    pinkOverlay: "rgba(252, 167, 175, 0.32)",
} as const;
```

---

## Типографика

Все шрифты подключаются через Google Fonts. В проекте используется пять ролей.

| Роль | Семейство | Вес | Desktop (clamp) | Mobile | Назначение |
|---|---|---|---|---|---|
| **Display** | Montserrat | 400 | `clamp(40px, 5vw, 72px)` | 32 px | Hero-заголовок главной |
| **Headline** | Montserrat | 400 | `clamp(28px, 3vw, 48px)` | 24 px | H2 секций, заголовки страниц |
| **Decorative** | Cormorant Garamond / Tenor Sans | 400/500 | `clamp(20px, 2vw, 32px)` | 18 px | Подзаголовки, цитаты, декоративные акценты |
| **Body** | Montserrat | 400/500 | `clamp(14px, 1vw, 18px)` | 14 px | Основной текст абзацев, описания карточек |
| **Caption / Hand** | Caveat / Lobster / Pacifico | 400/700 | `clamp(18px, 2vw, 28px)` | 16 px | Декор-надписи «от руки», бейджи |
| **Mono / Tech** | JetBrains Mono | 400 | `14px` | 12 px | Техтекст, мелкий шрифт футера, дисклеймеры |

### Замены нестандартных шрифтов из Figma

| В Figma | В коде | Причина |
|---|---|---|
| Complex | Cormorant Garamond или Tenor Sans | Шрифт «Complex» не распространяется свободно |
| DRUZHOK | Caveat / Lobster / Pacifico | DRUZHOK — коммерческий, заменён ближайшим аналогом из Google Fonts |
| Consolas | JetBrains Mono | Consolas принадлежит Microsoft, заменён открытым моноширинным |

### Объект `typography.ts`

```typescript
// src/shared/theme/typography.ts
export const typography = {
    display: {
        family: '"Montserrat", sans-serif',
        weight: 400,
        size: "clamp(40px, 5vw, 72px)",
        lineHeight: 1.1,
    },
    headline: {
        family: '"Montserrat", sans-serif',
        weight: 400,
        size: "clamp(28px, 3vw, 48px)",
        lineHeight: 1.2,
    },
    decorative: {
        family: '"Cormorant Garamond", "Tenor Sans", serif',
        weight: 500,
        size: "clamp(20px, 2vw, 32px)",
        lineHeight: 1.3,
    },
    body: {
        family: '"Montserrat", sans-serif',
        weight: 400,
        size: "clamp(14px, 1vw, 18px)",
        lineHeight: 1.5,
    },
    hand: {
        family: '"Caveat", "Lobster", cursive',
        weight: 700,
        size: "clamp(18px, 2vw, 28px)",
        lineHeight: 1.2,
    },
    mono: {
        family: '"JetBrains Mono", monospace',
        weight: 400,
        size: "14px",
        lineHeight: 1.4,
    },
} as const;
```

### Правило `clamp()`

Размеры заголовков и тела текста задаются через `clamp(min, preferred, max)`, чтобы плавно масштабироваться между брейкпойнтами без явных медиа-запросов.

---

## Шкала отступов

Базовая единица — **4 px**. Все отступы в проекте берутся только из шкалы.

| Токен | Значение | Применение |
|---|---|---|
| `xs` | 4 px | Промежуток между иконкой и текстом в кнопке |
| `sm` | 8 px | Внутренний padding малых элементов, gap в Tag |
| `md` | 16 px | Стандартный gap в карточках, padding кнопок |
| `lg` | 24 px | Внешние отступы карточек, gap между блоками внутри секции |
| `xl` | 32 px | Padding секций по вертикали (mobile) |
| `xxl` | 48 px | Padding секций по вертикали (desktop) |
| `xxxl` | 64 px | Внешние отступы крупных секций, gap Hero |

### Объект `spacing.ts`

```typescript
// src/shared/theme/spacing.ts
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;
```

Использование в стилях:

```typescript
const Card = styled.div`
    padding: ${({ theme }) => theme.spacing.lg}px;
    gap: ${({ theme }) => theme.spacing.md}px;
`;
```

---

## Брейкпойнты и адаптивность

| Брейкпойнт | Min-ширина | Применение |
|---|---|---|
| `xxl` | 1920 px | Большие десктопы, FullHD+ |
| `xl` | 1366 px | Стандартные ноутбуки |
| `lg` | 800 px | Планшеты горизонтально / маленькие ноутбуки |
| `md` | 480 px | Большие смартфоны |
| `sm` | 0 | Малые смартфоны |

### Объект `breakpoints.ts`

```typescript
// src/shared/theme/breakpoints.ts
export const breakpoints = {
    sm: 0,
    md: 480,
    lg: 800,
    xl: 1366,
    xxl: 1920,
} as const;

export const media = {
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`,
    xxl: `@media (min-width: ${breakpoints.xxl}px)`,
} as const;
```

### Конкретные медиа-запросы

```css
/* Малые смартфоны: < 480px (по умолчанию) */

/* Большие смартфоны: 480–799px */
@media (min-width: 480px) and (max-width: 799px) { ... }

/* Планшеты: 800–1365px */
@media (min-width: 800px) and (max-width: 1365px) { ... }

/* Стандартные десктопы: 1366–1919px */
@media (min-width: 1366px) and (max-width: 1919px) { ... }

/* Большие десктопы: ≥1920px */
@media (min-width: 1920px) { ... }
```

### Правила адаптации

| Элемент | Поведение |
|---|---|
| Главное меню | Burger при `< 800 px` |
| Сетки карточек (каталог, отзывы, новости) | 4 → 3 → 2 → 1 колонка |
| Hero | Высота `100vh` на десктопе, `auto` на мобайле |
| Шрифты | Через `clamp()`, без явных правил |
| Padding секций | `xxl` (48 px) на десктопе, `xl` (32 px) на мобайле |
| Footer | 3 колонки → 1 колонка |

---

## Сетка и контейнеры

Максимальная ширина контента — **1440 px**, центрируется через `margin: 0 auto`. Боковые отступы:

| Брейкпойнт | Боковой padding |
|---|---|
| `< 480` | 16 px |
| `480–799` | 24 px |
| `800–1365` | 32 px |
| `≥ 1366` | 48 px |

```typescript
const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;

    ${media.md} { padding: 0 24px; }
    ${media.lg} { padding: 0 32px; }
    ${media.xl} { padding: 0 48px; }
`;
```

---

## Компоненты

### Button

Атомарная кнопка с тремя вариантами.

| Prop | Тип | Описание |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | Визуальный стиль |
| `size` | `"sm" \| "md" \| "lg"` | Размер |
| `as` | `"button" \| "a"` | Полиморфизм через styled-components |
| `disabled` | `boolean` | Отключение |
| `fullWidth` | `boolean` | Растягивание на 100 % ширины |

| Вариант | Фон | Текст | Бордер |
|---|---|---|---|
| primary | `accentPinkPrimary` | `white` | нет |
| secondary | `transparent` | `accentBronze` | 1 px `accentBronze` |
| ghost | `transparent` | `accentPinkPrimary` | нет |

Высоты:

- `sm` — 32 px, padding `0 16px`
- `md` — 44 px, padding `0 24px`
- `lg` — 56 px, padding `0 32px`

Радиус: 999 px (pill). Переход цвета: `transition: background-color 150ms ease`.

### Card

Универсальная карточка для каталога, отзывов, новостей.

| Prop | Тип | Описание |
|---|---|---|
| `as` | `"div" \| "a" \| "article"` | Семантический тег |
| `imageSrc` | `string` | URL изображения |
| `imageAlt` | `string` | Alt-текст |
| `title` | `string` | Заголовок |
| `description` | `string` | Краткое описание |
| `tag` | `string` | Опциональный бейдж-тег |
| `onClick` | `() => void` | Обработчик клика |

Стили:

- Фон: `white`.
- Радиус: 16 px.
- Тень: `0 4px 12px rgba(155, 142, 90, 0.08)`.
- Padding: `lg` (24 px).
- Hover: лёгкое поднятие `transform: translateY(-4px)`, усиление тени.

### Tag

Бейдж категории.

| Prop | Тип | Описание |
|---|---|---|
| `color` | `"pink" \| "bronze" \| "soft"` | Цветовая схема |
| `children` | `string` | Текст |

Стили:

- Высота: 24 px.
- Padding: `0 sm` (8 px).
- Радиус: 999 px.
- Шрифт: `body`, 12 px, uppercase, letter-spacing 0.05em.

| Цвет | Фон | Текст |
|---|---|---|
| pink | `pinkOverlay` | `accentPinkSoft` |
| bronze | `bgSoft` | `accentBronze` |
| soft | `coolGrayMuted` | `accentBronze` |

---

## Иконография

- Все иконки — SVG, монохромные, наследуют `currentColor`.
- Размеры: 16, 20, 24, 32 px.
- Хранятся в `src/shared/assets/icons/`.
- Подключаются как React-компоненты через `vite-plugin-svgr`.

Базовый набор:

| Иконка | Использование |
|---|---|
| `logo.svg` | Логотип в header |
| `burger.svg` | Бургер-меню |
| `close.svg` | Закрытие мобильного меню |
| `phone.svg` | Контакт-блок |
| `mail.svg` | Контакт-блок |
| `telegram.svg` | Соц-кнопки |
| `instagram.svg` | Соц-кнопки |
| `star.svg` | Рейтинг в отзывах |
| `arrow-right.svg` | CTA, переходы |

---

## Тени и скругления

| Токен | Значение | Применение |
|---|---|---|
| `shadow.sm` | `0 2px 8px rgba(155, 142, 90, 0.06)` | Лёгкая тень для tag-элементов |
| `shadow.md` | `0 4px 12px rgba(155, 142, 90, 0.08)` | Карточки |
| `shadow.lg` | `0 8px 24px rgba(155, 142, 90, 0.12)` | Hover на карточках, модалки |

| Радиус | Значение | Применение |
|---|---|---|
| `radius.sm` | 8 px | Поля ввода (если появятся), служебные блоки |
| `radius.md` | 16 px | Карточки |
| `radius.lg` | 24 px | Hero-блок, крупные секции |
| `radius.pill` | 999 px | Кнопки, теги |

---

## Анимации

| Параметр | Значение |
|---|---|
| Стандартный easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Длительность hover | 150 ms |
| Длительность раскрытия меню | 300 ms |
| Длительность появления карточек (stagger) | 200 ms на элемент |

Все анимации работают только при отсутствии `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```
