#!/bin/bash
set -e

# 1. Билдим и запускаем сервисы
echo "==> Билдим и запускаем сервисы (backend + frontend)..."
docker compose build --no-cache
docker compose up -d --build

# 2. Ждём, пока backend поднимется
echo "==> Ждём, пока backend поднимется..."
ATTEMPTS=0
until docker compose exec api ls > /dev/null 2>&1; do
  sleep 1
  ATTEMPTS=$((ATTEMPTS+1))
  if [ $ATTEMPTS -gt 30 ]; then
    echo "Backend не стартует. Проверь логи docker compose logs api"
    exit 1
  fi
done

# 3. Применяем миграции
echo "==> Применяем миграции..."
docker compose exec api npx prisma migrate deploy

# 4. Готово
echo "==> Всё готово! Открой http://localhost:3000" 