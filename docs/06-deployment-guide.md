# 06. Руководство по деплою — Бусинка

## Оглавление

1. [Архитектура развёртывания](#архитектура-развёртывания)
2. [Сравнение хостингов VPS](#сравнение-хостингов-vps)
3. [Шаг 1. Покупка VPS](#шаг-1-покупка-vps)
4. [Шаг 2. Первичная настройка сервера](#шаг-2-первичная-настройка-сервера)
5. [Шаг 3. Установка Docker и Docker Compose](#шаг-3-установка-docker-и-docker-compose)
6. [Шаг 4. Покупка домена](#шаг-4-покупка-домена)
7. [Шаг 5. Настройка DNS](#шаг-5-настройка-dns)
8. [Шаг 6. Клонирование репозитория и запуск](#шаг-6-клонирование-репозитория-и-запуск)
9. [Шаг 7. Выпуск SSL через Let's Encrypt](#шаг-7-выпуск-ssl-через-lets-encrypt)
10. [Шаг 8. Обновление сайта](#шаг-8-обновление-сайта)
11. [Шаг 9. Бэкапы и мониторинг](#шаг-9-бэкапы-и-мониторинг)
12. [Конфигурационные файлы](#конфигурационные-файлы)

---

## Архитектура развёртывания

Сайт собирается в Docker-образ из двух стадий:

1. **build-стадия** на `node:20-alpine` — устанавливает зависимости, собирает Vite-бандл в `/app/dist`.
2. **runtime-стадия** на `nginx:1.27-alpine` — забирает `dist/` и раздаёт через nginx.

Дополнительно через `docker-compose` поднимается контейнер `certbot` для получения и автообновления SSL-сертификатов Let's Encrypt.

```
┌────────────────────────────────────────┐
│  VPS (Ubuntu 22.04)                    │
│                                        │
│  ┌──────────────┐  ┌─────────────┐    │
│  │  nginx       │  │  certbot    │    │
│  │  (статика)   │  │  (SSL)      │    │
│  └──────┬───────┘  └──────┬──────┘    │
│         │ 80/443           │           │
│         └─────────┬────────┘           │
│                   │                    │
└───────────────────┼────────────────────┘
                    │
                Internet
```

---

## Сравнение хостингов VPS

| Хостинг | Цена за младший VPS (₽/мес.) | Конфигурация | Регионы | Поддержка | Особенности |
|---|---|---|---|---|---|
| Selectel | от 240 | 1 vCPU / 1 ГБ / 10 ГБ NVMe | Москва, СПб, Новосибирск | 24/7, рус. | Большой выбор образов, гибкая тарификация по часам |
| Timeweb | от 200 | 1 vCPU / 1 ГБ / 15 ГБ NVMe | Москва, СПб | 24/7, рус. | Простая панель, бесплатные снапшоты |
| Hetzner | от 4,5 € (≈ 450) | 2 vCPU / 4 ГБ / 40 ГБ NVMe | Германия, Финляндия, США | 24/7, англ./нем. | Лучшее соотношение цена/мощность в ЕС |
| Beget | от 165 | 1 vCPU / 1 ГБ / 10 ГБ SSD | Москва, СПб | 24/7, рус. | Бесплатный домен в зоне `.ru` на год |

**Рекомендация:** для старта — Timeweb или Beget (минимальная цена и русская поддержка). При росте нагрузки — переезд на Selectel или Hetzner.

---

## Шаг 1. Покупка VPS

1. Зарегистрируйтесь у выбранного провайдера (например, Timeweb).
2. Выберите тариф минимум 1 vCPU / 1 ГБ RAM / 10 ГБ диска.
3. В качестве ОС укажите **Ubuntu 22.04 LTS** (без панели управления).
4. Выберите регион ближайший к ЦА — для Ростова-на-Дону подходит Москва или СПб.
5. Сгенерируйте SSH-ключ на локальной машине (если ещё нет):

```bash
ssh-keygen -t ed25519 -C "businka-deploy" -f ~/.ssh/businka_deploy
```

6. Загрузите публичный ключ (`~/.ssh/businka_deploy.pub`) в панели VPS перед созданием сервера.
7. После создания получите IP-адрес сервера. Запишите его — он понадобится дальше.

---

## Шаг 2. Первичная настройка сервера

### Подключение под root

```bash
ssh -i ~/.ssh/businka_deploy root@SERVER_IP
```

### Обновление пакетов

```bash
apt update && apt upgrade -y
apt install -y curl ufw fail2ban
```
---

## Шаг 3. Установка Docker и Docker Compose

### Установка Docker Engine

```bash
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Проверка

```bash
docker --version
docker compose version
docker run --rm hello-world
```

---

## Шаг 4. Покупка домена

1. Откройте регистратор: [reg.ru](https://www.reg.ru) или [nic.ru](https://www.nic.ru).
2. В поиске введите желаемое имя, например `businka-rnd.ru`.
3. Оформите заказ. Стоимость доменов в зоне `.ru` — около 200–400 ₽/год.
4. После оплаты домен появится в личном кабинете в течение 5–15 минут.

---

## Шаг 5. Настройка DNS

В панели регистратора домена откройте раздел «DNS-серверы / DNS-записи».

Добавьте две A-записи:

| Тип | Имя | Значение | TTL |
|---|---|---|---|
| A | `@` | IP вашего VPS | 3600 |
| A | `www` | IP вашего VPS | 3600 |

Распространение DNS занимает от 15 минут до нескольких часов. Проверить можно командой:

```bash
dig businka-rnd.ru +short
dig www.businka-rnd.ru +short
```

Обе команды должны вернуть IP сервера.

---

## Шаг 6. Клонирование репозитория и запуск

### Клонирование

```bash
cd ~
git clone https://github.com/YOUR_ORG/businka.git
cd businka
```

### Структура продакшен-файлов

В корне репозитория уже лежат (создаются разработчиком, не вручную):

- `Dockerfile` — multi-stage сборка (node:20-alpine → nginx:1.27-alpine).
- `docker-compose.yml` — сервисы `web` и `certbot`.
- `nginx.conf` — HTTP-конфиг для первичного запуска (с location для ACME-челленджа).
- `nginx-ssl.conf` — HTTPS-конфиг с подстановкой `${DOMAIN}` (активируется после выпуска сертификата).
- `scripts/init-ssl.sh` — автоматический выпуск SSL и переключение nginx на HTTPS-конфиг.
- `scripts/deploy.sh` — обновление сайта (git pull + пересборка).
- `.env.example` — шаблон env-переменных.

### Подготовка переменных окружения

```bash
cp .env.example .env
nano .env
```

В файле задайте свой домен и email:

```
DOMAIN=businka-rnd.ru
EMAIL=businka@mail.ru
```

### Первый запуск (без SSL, только HTTP)

На этом этапе nginx слушает порт 80 и отдаёт webroot для certbot:

```bash
docker compose up --build -d web
docker compose ps
docker compose logs -f web
```

Откройте в браузере `http://businka-rnd.ru` — должен открыться сайт (без https-замка).

---

## Шаг 7. Выпуск SSL через Let's Encrypt

### Автоматический способ (рекомендуется)

В репозитории лежит `scripts/init-ssl.sh`, который делает всё за вас: проверяет `.env`, запускает webroot certbot, подставляет `${DOMAIN}` в `nginx-ssl.conf` через `sed`, заменяет `nginx.conf` на `nginx-ssl.conf` (с бэкапом `nginx.conf.http.bak`) и пересобирает `web`-контейнер.

```bash
chmod +x scripts/init-ssl.sh scripts/deploy.sh
bash scripts/init-ssl.sh
```

После завершения откройте `https://businka-rnd.ru` — должен загрузиться сайт с валидным сертификатом.

### Ручной способ (для понимания)

Если хочется выполнить шаги по отдельности:

```bash
mkdir -p ./certbot/conf ./certbot/www

docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email businka@mail.ru \
    --agree-tos \
    --no-eff-email \
    -d businka-rnd.ru \
    -d www.businka-rnd.ru
```

После успешного выпуска сертификаты будут лежать в `./certbot/conf/live/businka-rnd.ru/`:

```
fullchain.pem
privkey.pem
chain.pem
cert.pem
```

### Переключение nginx на HTTPS

При автоматическом способе (через `scripts/init-ssl.sh`) переключение происходит автоматически: `nginx.conf` бэкапится в `nginx.conf.http.bak`, и на его место копируется `nginx-ssl.conf` с подставленным доменом.

При ручном способе скопируйте конфиг сами:

```bash
cp nginx.conf nginx.conf.http.bak
sed "s/\${DOMAIN}/businka-rnd.ru/g" nginx-ssl.conf > nginx.conf
docker compose up -d --build web
```

Проверьте: `https://businka-rnd.ru` — должен загружаться с валидным сертификатом.

### Автообновление сертификата

В `docker-compose.yml` контейнер certbot запускается с командой:

```yaml
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

Это даёт **попытку обновления каждые 12 часов**. Let's Encrypt обновляет сертификат, только если до истечения осталось менее 30 дней.

Дополнительно nginx нужно периодически перезагружать после обновления. Добавьте cron-задачу:

```bash
crontab -e
```

Вставьте:

```cron
0 3 * * * docker compose -f /home/deploy/businka/docker-compose.yml exec nginx nginx -s reload >> /var/log/nginx-reload.log 2>&1
```

### Ручная проверка автообновления

```bash
docker compose run --rm certbot renew --dry-run
```

Команда должна завершиться без ошибок.

---

## Шаг 8. Обновление сайта

В репозитории есть `scripts/deploy.sh`, который делает `git pull --ff-only` → `docker compose build web` → `docker compose up -d web` → `docker compose ps`:

```bash
bash scripts/deploy.sh
```

Эквивалент вручную:

```bash
cd ~/businka
git pull origin main
docker compose up --build -d web
docker compose ps
```

Опционально (очистка старых образов, чтобы не забивать диск):

```bash
docker image prune -f
```

### Откат на предыдущую версию

Если новый билд оказался сломан:

```bash
cd ~/businka
git log --oneline -10
git checkout <prev_commit_sha>
docker compose up --build -d
```

Когда фикс готов — `git checkout main && git pull && docker compose up --build -d`.

---

## Шаг 9. Бэкапы и мониторинг

### Бэкапы

Сайт — статический, БД нет. Бэкапить нужно:

- Исходники — лежат в Git (репозиторий — это и есть бэкап).
- Сертификаты Let's Encrypt — `./certbot/conf/`.
- nginx-конфиг — лежит в репозитории.

Бэкап сертификатов раз в неделю в облако (например, через `rclone` в Yandex.Disk):

```bash
sudo apt install -y rclone
rclone config   # настройка remote
```

Cron-задача:

```cron
0 4 * * 0 tar czf /tmp/certbot-backup-$(date +\%F).tar.gz -C /home/deploy/businka certbot/conf \
    && rclone copy /tmp/certbot-backup-$(date +\%F).tar.gz yandex:businka-backups \
    && rm /tmp/certbot-backup-*.tar.gz
```

### Мониторинг доступности

Используйте бесплатный внешний пинг-сервис:

- [UptimeRobot](https://uptimerobot.com) — бесплатно до 50 мониторов, проверка каждые 5 минут.
- [BetterStack](https://betterstack.com/uptime) — красивый дашборд.

Добавьте монитор HTTPS на `https://businka-rnd.ru` с уведомлением в Telegram/email.

### Мониторинг ресурсов VPS

Простой способ:

```bash
sudo apt install -y htop ncdu
htop          # CPU и RAM
ncdu /        # анализ диска
df -h         # свободное место
```

Для долговременного мониторинга — Netdata (одноклик, веб-интерфейс):

```bash
bash <(curl -SsL https://my-netdata.io/kickstart.sh) --dont-start-it --disable-telemetry
```

После установки откройте `http://SERVER_IP:19999` (предварительно разрешите порт в ufw только с вашего IP).

### Логи nginx

```bash
docker compose logs -f --tail=200 nginx
```

Логи хранятся внутри контейнера; для постоянного хранения смонтируйте volume:

```yaml
volumes:
  - ./logs/nginx:/var/log/nginx
```

И ротируйте через `logrotate`.

---

## Конфигурационные файлы

### Dockerfile

```dockerfile
# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime stage ----
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
services:
    nginx:
        build: .
        container_name: businka-nginx
        restart: unless-stopped
        ports:
            - "80:80"
            - "443:443"
        volumes:
            - ./certbot/conf:/etc/letsencrypt
            - ./certbot/www:/var/www/certbot
        depends_on:
            - certbot

    certbot:
        image: certbot/certbot:latest
        container_name: businka-certbot
        restart: unless-stopped
        volumes:
            - ./certbot/conf:/etc/letsencrypt
            - ./certbot/www:/var/www/certbot
        entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name businka-rnd.ru www.businka-rnd.ru;

    # ACME challenge для Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Редирект на HTTPS (включить после выпуска сертификата)
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name businka-rnd.ru www.businka-rnd.ru;

    ssl_certificate     /etc/letsencrypt/live/businka-rnd.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/businka-rnd.ru/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/json
        application/xml
        application/xml+rss
        image/svg+xml;

    root /usr/share/nginx/html;
    index index.html;

    # Кеширование статики
    location ~* \.(?:css|js|woff2?|ttf|otf|eot|jpg|jpeg|png|gif|svg|webp|ico)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, no-transform";
    }

    # SPA fallback — все маршруты отдают index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Чек-лист перед публикацией

- [ ] Купили домен, прописали A-записи.
- [ ] Подняли VPS, настроили `deploy`-пользователя, ufw, fail2ban.
- [ ] Установили Docker и Docker Compose.
- [ ] Склонировали репозиторий, собрали и запустили compose.
- [ ] Выпустили SSL через certbot, включили HTTPS в nginx.
- [ ] Настроили cron на reload nginx раз в сутки.
- [ ] Подключили UptimeRobot.
- [ ] Настроили резервное копирование `certbot/conf`.
- [ ] Прогнали регрессионный сценарий из `05-test-plan.md`.
