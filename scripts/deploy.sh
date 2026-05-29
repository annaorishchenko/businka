#!/usr/bin/env bash
# =============================================================================
# deploy.sh — обновление сайта на сервере.
#
# Что делает:
#   1. git pull — забирает последние изменения.
#   2. docker compose build web — пересобирает образ (Vite build внутри Docker).
#   3. docker compose up -d web — поднимает обновлённый контейнер (без даунтайма
#      на уровне compose: старый стопается только после успешного старта нового).
#   4. docker compose ps — показывает финальный статус.
#
# Запускать на сервере из корня проекта:
#   bash scripts/deploy.sh
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> [1/4] git pull..."
git pull --ff-only

echo "==> [2/4] docker compose build web..."
docker compose build web

echo "==> [3/4] docker compose up -d web..."
docker compose up -d web

echo "==> [4/4] статус контейнеров:"
docker compose ps

echo
echo "==> Deploy finished."
