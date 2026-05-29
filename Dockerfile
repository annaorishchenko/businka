# syntax=docker/dockerfile:1.6

# ============================================================================
# Stage 1: Builder
# Собираем production-бандл Vite-приложения.
# ============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Сначала копируем только манифесты — это даёт максимальный layer cache:
# пересборка зависимостей произойдёт только при изменении package*.json.
COPY package.json package-lock.json* ./

# npm ci — детерминированная установка строго по lock-файлу.
RUN npm ci --no-audit --no-fund

# Копируем исходники после установки зависимостей.
COPY . .

# Production-сборка Vite. На выходе — /app/dist.
RUN npm run build

# ============================================================================
# Stage 2: Runtime
# Минимальный nginx, отдающий статику.
# ============================================================================
FROM nginx:1.27-alpine AS runtime

# curl нужен для HEALTHCHECK.
RUN apk add --no-cache curl \
    && rm -rf /var/cache/apk/*

# Удаляем дефолтный конфиг и кладём свой.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Подкладываем собранную статику.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Простая проверка живости: nginx должен отвечать 200 на /.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://127.0.0.1/ || exit 1

# Дефолтный CMD базового образа nginx:alpine.
CMD ["nginx", "-g", "daemon off;"]
