# 02. Техническая архитектура — Бусинка

## Оглавление

1. [Технологический стек](#технологический-стек)
2. [Структура папок (FSD-lite)](#структура-папок-fsd-lite)
3. [Компонентная схема](#компонентная-схема)
4. [Маршрутизация](#маршрутизация)
5. [Управление состоянием](#управление-состоянием)
6. [Темизация](#темизация)
7. [Работа с ассетами](#работа-с-ассетами)
8. [Сборка и переменные окружения](#сборка-и-переменные-окружения)
9. [Тестирование](#тестирование)
10. [Качество кода](#качество-кода)

---

## Технологический стек

| Технология | Версия | Обоснование выбора |
|---|---|---|
| Vite | 5.x | Быстрый dev-сервер с HMR, нативный ESM, лёгкая конфигурация. Сборка статики идеально подходит для сайта-визитки. |
| React | 18.2 | Стандарт индустрии, огромная экосистема, опыт команды. |
| TypeScript | 5.x | Статическая типизация снижает количество runtime-ошибок и облегчает рефакторинг. |
| react-router-dom | 6.x | Декларативный роутинг с поддержкой вложенных layout-маршрутов и lazy-loading. |
| styled-components | 6.x | CSS-in-JS с поддержкой тем через ThemeProvider, динамические стили на основе пропсов. |
| Vitest | 1.x | Тестовый раннер, нативно совместимый с Vite, быстрый запуск. |
| @testing-library/react | 14.x | Тестирование по поведению, а не по реализации. |
| ESLint + Prettier | latest | Унификация стиля и предотвращение типовых ошибок. |
| Docker + nginx | latest | Воспроизводимый деплой статики с SPA-fallback. |

### Принципиальные ограничения

- **Без backend.** Сайт — чистая статика. Никаких API, базы данных, форм с отправкой.
- **Без глобального стора.** Состояние локальное, через `useState`. Redux/Zustand/Context — избыточны для визитки.
- **Без SSR.** Vite собирает обычный SPA. SEO обеспечивается мета-тегами в `index.html` и pre-rendered-контентом главной.

---

## Структура папок (FSD-lite)

Используется упрощённая Feature-Sliced Design без слоёв `features` и `entities` (бизнес-логики нет). Слои сверху вниз — от композиции к примитивам.

```
project/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── App.tsx               # корневой компонент
│   │   ├── providers/
│   │   │   ├── RouterProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── router/
│   │   │   └── routes.tsx        # карта маршрутов
│   │   └── styles/
│   │       └── GlobalStyles.ts   # сбросы, base typography
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.styled.ts
│   │   │   └── index.ts
│   │   ├── CatalogPage/
│   │   ├── NewsPage/
│   │   ├── AboutPage/
│   │   ├── ReviewsPage/
│   │   └── NotFoundPage/
│   ├── widgets/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── CatalogPreview/
│   │   ├── FeaturesBlock/
│   │   └── MasterClassBlock/
│   ├── shared/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── Tag/
│   │   ├── theme/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── breakpoints.ts
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useMediaQuery.ts
│   │   │   └── useScrollLock.ts
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   └── constants/
│   │       ├── contacts.ts       # телефон, email, Telegram
│   │       └── navigation.ts     # пункты меню
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   └── setup.ts
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

### Правила импортов между слоями

| Из / В | app | pages | widgets | shared |
|---|---|---|---|---|
| **app** | — | да | да | да |
| **pages** | нет | нет | да | да |
| **widgets** | нет | нет | нет | да |
| **shared** | нет | нет | нет | внутри слоя |

Кросс-импорты внутри одного слоя (например, widget импортирует widget) запрещены.

### Алиасы путей

В `tsconfig.json` и `vite.config.ts` настраивается алиас `@/` → `src/`:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 5173,
    },
});
```

---

## Компонентная схема

Общий layout оборачивает все маршруты, кроме 404:

```
App
├── ThemeProvider
│   └── GlobalStyles
│       └── RouterProvider
│           └── Layout
│               ├── Header
│               │   ├── Logo
│               │   ├── NavMenu (desktop) | BurgerButton (mobile)
│               │   └── MobileDrawer
│               ├── <Outlet />            ← сюда рендерится Page
│               │   ├── HomePage
│               │   │   ├── Hero
│               │   │   ├── CatalogPreview
│               │   │   ├── SurpriseBlock
│               │   │   ├── PopularBlock
│               │   │   ├── FeaturesBlock
│               │   │   └── MasterClassBlock
│               │   ├── CatalogPage
│               │   ├── NewsPage
│               │   ├── AboutPage
│               │   ├── ReviewsPage
│               │   └── NotFoundPage
│               └── Footer
│                   ├── ContactsBlock
│                   ├── AddressBlock
│                   ├── SocialLinks
│                   └── MetaDisclaimer
```

### Принципы декомпозиции

- **Pages** — композиция widgets, без собственной разметки.
- **Widgets** — самодостаточные блоки UI, могут содержать локальное состояние.
- **Shared/ui** — атомарные компоненты без бизнес-смысла.

---

## Маршрутизация

Используется `createBrowserRouter` из `react-router-dom@6` с layout-маршрутом.

| Маршрут | Компонент | Lazy | Layout |
|---|---|---|---|
| `/` | `HomePage` | да | да |
| `/catalog` | `CatalogPage` | да | да |
| `/news` | `NewsPage` | да | да |
| `/about` | `AboutPage` | да | да |
| `/reviews` | `ReviewsPage` | да | да |
| `*` | `NotFoundPage` | да | да |

### Пример конфигурации

```typescript
// src/app/router/routes.tsx
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/widgets/Layout";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CatalogPage = lazy(() => import("@/pages/CatalogPage"));
const NewsPage = lazy(() => import("@/pages/NewsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "news", element: <NewsPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "reviews", element: <ReviewsPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
```

Все страницы загружаются через `React.lazy` и оборачиваются в `<Suspense>` с фолбэком-скелетоном в `Layout`.

---

## Управление состоянием

В проекте **нет глобального стора** — никакого Redux, Zustand, MobX, Context API для бизнес-данных. Обоснование:

1. Сайт не имеет авторизации, корзины, фильтров с сохранением.
2. Все данные (каталог, отзывы, новости) статичны и хранятся в виде констант в `src/shared/constants/`.
3. Локальное UI-состояние (открыто ли бургер-меню, какая карточка в фокусе) живёт в `useState` соответствующего компонента.

### Категории состояния и где они хранятся

| Тип состояния | Место | Пример |
|---|---|---|
| Открытие/закрытие меню | `useState` в `Header` | `const [isOpen, setOpen] = useState(false)` |
| Текущий маршрут | `react-router` | `useLocation()` |
| Тема (если будет тёмная) | `ThemeProvider` через Context | — |
| Данные каталога | Константы в `shared/constants/catalog.ts` | `export const CATALOG = [...]` |
| Данные отзывов | Константы в `shared/constants/reviews.ts` | — |

### Когда добавлять стор

Если в будущем появится:

- Корзина или избранное.
- Динамический фильтр каталога с сохранением в URL.
- Авторизация.

— тогда подключается **Zustand** как самый лёгкий вариант. До этого момента стор избыточен.

---

## Темизация

### ThemeProvider

`styled-components` предоставляет `ThemeProvider`, в который передаётся объект темы. Тема доступна во всех styled-компонентах через пропс `theme`.

```typescript
// src/shared/theme/index.ts
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { breakpoints } from "./breakpoints";

export const theme = {
    colors,
    typography,
    spacing,
    breakpoints,
};

export type AppTheme = typeof theme;
```

```typescript
// src/app/providers/ThemeProvider.tsx
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";
import type { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
    <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
);
```

### Декларация типа темы

```typescript
// src/shared/theme/styled.d.ts
import "styled-components";
import type { AppTheme } from "./index";

declare module "styled-components" {
    export interface DefaultTheme extends AppTheme {}
}
```

### Пример использования в компоненте

```typescript
import styled from "styled-components";

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.accentPink};
    font-family: ${({ theme }) => theme.typography.headline.family};
    font-size: ${({ theme }) => theme.typography.headline.sizeDesktop};
    padding: ${({ theme }) => theme.spacing.lg}px;
`;
```

---

## Работа с ассетами

### Изображения

- Хранятся в `src/shared/assets/images/`.
- Импортируются через `import imgUrl from "@/shared/assets/images/hero.webp"`.
- Формат — WebP с фолбэком на JPG для критичных изображений.
- Vite автоматически хеширует имена при сборке для кеша.

### Иконки

- Хранятся в `src/shared/assets/icons/` как SVG.
- Импортируются как React-компоненты через `vite-plugin-svgr`.

```typescript
import LogoIcon from "@/shared/assets/icons/logo.svg?react";
```

### Шрифты

Подключаются через Google Fonts в `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Cormorant+Garamond:wght@400;500&family=Tenor+Sans&family=Caveat:wght@400;700&family=JetBrains+Mono:wght@400&display=swap"
    rel="stylesheet"
/>
```

---

## Сборка и переменные окружения

### Скрипты

| Скрипт | Команда | Назначение |
|---|---|---|
| `dev` | `vite` | Локальная разработка (порт 5173) |
| `build` | `tsc && vite build` | Production-сборка в `dist/` |
| `preview` | `vite preview` | Локальный просмотр продакшен-сборки |
| `test` | `vitest run` | Однократный прогон тестов |
| `test:watch` | `vitest` | Тесты в watch-режиме |
| `lint` | `eslint src --ext .ts,.tsx` | Линтинг |
| `format` | `prettier --write src` | Форматирование |

### Переменные окружения

В проекте практически не используются (нет внешних API). Допустимо хранить:

| Переменная | Назначение |
|---|---|
| `VITE_TELEGRAM_URL` | Ссылка на Telegram-аккаунт |
| `VITE_INSTAGRAM_URL` | Ссылка на Instagram-аккаунт |
| `VITE_PHONE` | Телефон |
| `VITE_EMAIL` | Email |

Файлы: `.env`, `.env.production`. Все переменные с префиксом `VITE_` доступны в коде через `import.meta.env.VITE_*`.

---

## Тестирование

### Что тестируем

- **Smoke-тесты страниц** — рендер без падений.
- **Компоненты `shared/ui`** — поведение Button, Card, Tag.
- **Header** — открытие/закрытие бургер-меню, навигация.
- **Router** — 404 показывается на неизвестном пути.

### Что не тестируем

- Стили (визуально проверяются вручную или через Storybook в будущем).
- Сторонние библиотеки.

### Пример

```typescript
// src/shared/ui/Button/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/shared/theme";
import { Button } from "./Button";

test("отображает текст и реагирует на клик", async () => {
    const onClick = vi.fn();
    render(
        <ThemeProvider theme={theme}>
            <Button onClick={onClick}>Купить</Button>
        </ThemeProvider>,
    );
    const btn = screen.getByRole("button", { name: "Купить" });
    btn.click();
    expect(onClick).toHaveBeenCalledOnce();
});
```

---

## Качество кода

### ESLint

Базовые наборы правил:

- `eslint:recommended`
- `@typescript-eslint/recommended`
- `plugin:react-hooks/recommended`
- `plugin:react/jsx-runtime`

### Prettier

Конфиг:

```json
{
    "semi": true,
    "singleQuote": false,
    "tabWidth": 4,
    "printWidth": 100,
    "trailingComma": "all"
}
```

### Соглашения по именованию

| Сущность | Стиль | Пример |
|---|---|---|
| Компонент | PascalCase | `CatalogCard` |
| Файл компонента | PascalCase | `CatalogCard.tsx` |
| Styled-файл | PascalCase + `.styled` | `CatalogCard.styled.ts` |
| Хук | camelCase, префикс `use` | `useMediaQuery` |
| Константа | UPPER_SNAKE_CASE | `BREAKPOINTS` |
| Тип/интерфейс | PascalCase | `CatalogItem` |
