#!/usr/bin/env bash
# =============================================================================
# init-ssl.sh — первичный выпуск сертификата Let's Encrypt.
#
# Что делает:
#   1. Проверяет .env (DOMAIN, EMAIL).
#   2. Поднимает web на HTTP, чтобы certbot мог пройти ACME-челлендж.
#   3. Запрашивает сертификат через certbot --webroot.
#   4. Подставляет ${DOMAIN} в nginx-ssl.conf и заменяет им nginx.conf.
#   5. Пересобирает образ и перезапускает web.
#
# Запускать ОДИН РАЗ после первого `docker compose up -d --build web`
# и после того, как DNS A-запись действительно резолвится на этот сервер.
# =============================================================================
set -euo pipefail

# Переходим в корень проекта (на уровень выше папки scripts).
cd "$(dirname "$0")/.."

# ---------- 1. Проверка .env ----------
if [[ ! -f .env ]]; then
    echo "ERROR: .env не найден. Скопируйте .env.example в .env и заполните." >&2
    exit 1
fi

# Загружаем переменные.
set -a
# shellcheck disable=SC1091
source .env
set +a

: "${DOMAIN:?DOMAIN не задан в .env}"
: "${EMAIL:?EMAIL не задан в .env}"

echo "==> Домен:  $DOMAIN"
echo "==> E-mail: $EMAIL"

# ---------- 2. Готовим директории для certbot ----------
mkdir -p ./certbot/conf ./certbot/www

# ---------- 3. Поднимаем web на HTTP (если ещё не поднят) ----------
echo "==> Поднимаем web на HTTP для прохождения ACME-челленджа..."
docker compose up -d web

# Небольшая пауза, чтобы nginx точно отдал /.well-known/acme-challenge/.
sleep 3

# ---------- 4. Запрашиваем сертификат ----------
echo "==> Запрашиваем сертификат через certbot --webroot..."
docker compose run --rm --entrypoint "" certbot \
    certbot certonly \
        --webroot \
        -w /var/www/certbot \
        -d "$DOMAIN" \
        -d "www.$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive

# Проверяем, что fullchain.pem появился.
if [[ ! -f "./certbot/conf/live/$DOMAIN/fullchain.pem" ]]; then
    echo "ERROR: сертификат не выпустился. Проверьте DNS и логи выше." >&2
    exit 1
fi

# ---------- 5. Подменяем nginx.conf на SSL-версию ----------
echo "==> Подставляем DOMAIN в nginx-ssl.conf и заменяем nginx.conf..."

# Бэкап исходного HTTP-конфига (на случай отката).
if [[ ! -f nginx.conf.http.bak ]]; then
    cp nginx.conf nginx.conf.http.bak
fi

# Подставляем ${DOMAIN} прямо в nginx.conf — sed экранирует домен.
ESCAPED_DOMAIN=$(printf '%s\n' "$DOMAIN" | sed 's/[\/&]/\\&/g')
sed "s/\${DOMAIN}/$ESCAPED_DOMAIN/g" nginx-ssl.conf > nginx.conf

# ---------- 6. Пересобираем web с новым конфигом ----------
echo "==> Пересобираем образ web с SSL-конфигом..."
docker compose build web
docker compose up -d web

echo
echo "==> Готово."
echo "==> Откройте: https://$DOMAIN"
echo "==> Если что-то пошло не так — верните HTTP-конфиг: cp nginx.conf.http.bak nginx.conf && docker compose build web && docker compose up -d web"
