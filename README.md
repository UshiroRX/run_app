# Run Tracker App

Современное fullstack-приложение для трекинга пробежек с поддержкой загрузки фото и отметки на карте (OpenStreetMap).

---

## Архитектура

- **Монорепозиторий**: backend (NestJS + Prisma + SQLite), frontend (Next.js + Tailwind + React Leaflet), Docker Compose.
- **Backend**: REST API, хранение пробежек, аутентификация, загрузка фото, отдача статики.
- **Frontend**: UI для входа, добавления и просмотра пробежек, загрузка фото, выбор точки на карте.
- **Docker**: отдельные контейнеры для backend и frontend, volume для фото.

---

## Структура проекта

```
run_app/
├── backend/         # NestJS + Prisma + SQLite (API, аутентификация, хранение данных)
│   ├── src/         # Исходники NestJS (контроллеры, сервисы, DTO)
│   ├── prisma/      # Prisma schema, seed-скрипты
│   ├── uploads/     # Загруженные фото (volume, не хранится в git)
│   ├── Dockerfile   # Dockerfile для backend
│   └── package.json
│
├── frontend/        # Next.js + Tailwind + React Leaflet (UI)
│   ├── src/
│   │   ├── app/     # Страницы (login, dashboard, landing)
│   │   ├── components/ # Компоненты (AddRunForm, RunsTable, MapComponent, MiniMap)
│   ├── public/      # Статика (favicon и т.д.)
│   ├── Dockerfile   # Dockerfile для frontend
│   └── package.json
│
├── .env             # Переменные окружения для backend и frontend
├── docker-compose.yml
├── deploy.sh        # Скрипт для быстрого деплоя (build, up, миграции)
└── .gitignore
```

---

## Технологии

- **Backend**: NestJS, Prisma ORM, SQLite, Multer (загрузка файлов)
- **Frontend**: Next.js, React, Tailwind CSS, React Leaflet, Axios
- **Docker**: Docker Compose, volume для фото

---

## Возможности

- Аутентификация (email + пароль)
- Добавление пробежки: дистанция, время, место, фото, точка на карте
- Просмотр списка пробежек с фото и мини-картой
- Фото открывается в новой вкладке
- Мини-карта с точкой пробежки (OpenStreetMap)

---

## Переменные окружения (.env)

```
# Backend
DATABASE_URL="file:/usr/src/app/prisma/dev.db"
JWT_SECRET="CHANGE_THIS_SECRET_KEY"

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---
