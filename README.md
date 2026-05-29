# Бусинка

Сайт-визитка бренда украшений из бисера ручной работы. Ростов-на-Дону.

## Стек

- **Vite** + **React 18** + **TypeScript**
- **react-router-dom v6** (lazy-loaded страницы)
- **styled-components** + кастомная тема (палитра из Figma)
- **Vitest** + **@testing-library/react** для автотестов

## Структура

```
src/
├── app/              провайдеры, роутер, тема
├── pages/            HomePage, CatalogPage, NewsPage, AboutPage, ReviewsPage, NotFoundPage
├── widgets/          Header, Footer, Layout, Hero, CatalogPreview, Features, Popular, MasterClass
└── shared/
    ├── components/   Button, Card, Container, Icon, SectionTitle
    ├── constants/    routes, contacts, products, news, reviews
    ├── theme/        colors, typography, breakpoints
    ├── assets/       изображения, иконки, декор
    └── test/         setup, renderWithProviders
docs/                 6 файлов документации + test-report + screenshots/
scripts/              init-ssl.sh, deploy.sh
```

## Команды

```bash
npm install            # установка зависимостей
npm run dev            # dev-сервер на http://localhost:3000
npm run build          # production build в dist/
npm run preview        # просмотр production-сборки на :4173
npm run test           # автотесты (Vitest, 26 кейсов)
npm run test:coverage  # покрытие
npm run lint           # ESLint
```

## Документация

| Файл                                                       | О чём |
|------------------------------------------------------------|---|
| [docs/01-product-spec.md](docs/01-product-spec.md)         | Спецификация продукта |
| [docs/02-architecture.md](docs/02-architecture.md)         | Архитектура и FSD-lite |
| [docs/03-design-system.md](docs/03-design-system.md)       | Палитра, шрифты, spacing, breakpoints |
| [docs/04-user-guide.md](docs/04-user-guide.md)             | Руководство пользователя |
| [docs/05-test-plan.md](docs/05-test-plan.md)               | План тестирования (25 кейсов) |
| [docs/06-deployment-guide.md](docs/06-deployment-guide.md) | Деплой на VPS, SSL, обновление |
| [docs/07-test-report.md](docs/07-test-report.md)           | Отчёт о ручном тестировании |
| [docs/08-cost-estimate.md](docs/08-cost-estimate.md)         | Смета проекта |

## Деплой

См. [docs/06-deployment-guide.md](docs/06-deployment-guide.md). Кратко:

```bash
# на VPS (Ubuntu 22.04, Docker установлен)
git clone <repo> /opt/businka && cd /opt/businka
cp .env.example .env && nano .env   # выставить DOMAIN и EMAIL
docker compose up -d --build web
bash scripts/init-ssl.sh             # выпуск Let's Encrypt + переключение на HTTPS
```

Обновление: `bash scripts/deploy.sh` (git pull → пересборка → restart).

## Контент

Сайт выполнен по дизайну в [Figma](https://www.figma.com/design/TovL0UHDlRQiVzTj4817mv/). Содержимое (товары, новости, отзывы) — демо-данные в `src/shared/constants/*.ts`. Для production замените на реальный контент.
