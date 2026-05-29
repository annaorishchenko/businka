# Скриншоты тестовых сценариев

Эта папка содержит снимки экрана, на которые ссылается `07-test-report.md`.

## Как пересоздать скриншоты

1. Запустите dev-сервер: `npm run dev` (`http://localhost:3000`).
2. Откройте Chrome DevTools → Device Toolbar (`Cmd+Shift+M`).
3. Сделайте скриншоты для каждого сценария:

| Файл | URL | Viewport |
|---|---|---|
| `01-home-desktop.png` | `/` | 1920×1080 |
| `02-home-mobile.png` | `/` | 375×812 |
| `03-catalog-desktop.png` | `/catalog` | 1366×768 |
| `04-catalog-filter.png` | `/catalog` (после клика «Серьги») | 1366×768 |
| `05-news.png` | `/news` | 1366×768 |
| `06-about.png` | `/about` | 1366×768 |
| `07-reviews.png` | `/reviews` | 1366×768 |
| `08-not-found.png` | `/no-such-page` | 1366×768 |
| `09-burger-open.png` | `/` (бургер открыт) | 375×812 |
| `10-footer.png` | `/` (прокрутка вниз) | 1366×768 |
| `11-tablet.png` | `/` | 800×600 |
| `12-decor-pendants.png` | `/` (со включёнными декорами) | 1920×1080 |

DevTools → `…` → `Capture full size screenshot` сохраняет всю страницу.

## Зачем

Скриншоты идут в финальный отчёт о тестировании (`07-test-report.md`) — формат таблицы повторяет образец из `final.docx`.
