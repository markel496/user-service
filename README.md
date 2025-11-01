# User Service (Express + TypeScript + MongoDB)

Сервис для работы с пользователями: регистрация, авторизация, получение и блокировка.  
Реализован с использованием **Express**, **TypeScript** и **Mongoose**.

---

## Быстрый старт

1. Установить зависимости:

```bash
npm install
```

2. Запустить сервер в режиме разработки:

```bash
npm run dev
```

Сервер доступен по адресу `http://localhost:4000`.

---

## Аутентификация

- JWT-токен возвращается при регистрации и логине.
- Передача токена в заголовке `Authorization: Bearer JWT_TOKEN_HERE` обязательна для защищённых эндпоинтов.
- Роли пользователей:
  - `USER` — обычный пользователь
  - `ADMIN` — админ

---

## Эндпоинты

| Метод | URL              | Доступ       | Body (JSON)                                                       | Пример ответа (200)                                                              | Примечание                                         |
| ----- | ---------------- | ------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------- |
| POST  | /auth/register   | Public       | { firstName, lastName, patronymic?, dob, email, password, role? } | { user: { id, firstName, lastName, patronymic?, email, role, isActive }, token } | Роль по умолчанию `USER`; возраст не меньше 14 лет |
| POST  | /auth/login      | Public       | { email, password }                                               | { token }                                                                        | Если пользователь заблокирован — 403               |
| GET   | /users/:id       | Admin / Self | —                                                                 | { id, firstName, lastName, patronymic?, email, dob, role, isActive }             | 404 если не найден, 403 если нет доступа           |
| GET   | /users           | Admin        | —                                                                 | [ { id, firstName, lastName, patronymic?, email, dob, role, isActive }, ... ]    | Только для админа                                  |
| PATCH | /users/:id/block | Admin / Self | —                                                                 | { id, isActive }                                                                 | Блокировка или разблокировка пользователя          |

---

## Примеры запросов

В папке `test-data` хранятся JSON-файлы для curl / тестирования API.

`register.json` и `login.json` — примеры payload для POST /auth/register и /auth/login.

### Регистрация

```bash
curl -X POST http://localhost:4000/auth/register \
-H "Content-Type: application/json" \
-d @test-data/register.json
```

**Пример ответа:**

```json
{
  "user": {
    "id": "64ffae3a7d6c9b0e5b123456",
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com",
    "dob": "1995-01-23T00:00:00.000Z",
    "role": "USER",
    "isActive": true
  },
  "token": "JWT_TOKEN_HERE"
}
```

---

### Логин

```bash
curl -X POST http://localhost:4000/auth/login \
-H "Content-Type: application/json" \
-d @test-data/login.json
```

**Пример ответа:**

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### Получение пользователя по ID

```bash
curl -X GET http://localhost:4000/users/69063c8f2478a78832f393ce \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

**Пример ответа:**

```json
{
  "id": "64ffae3a7d6c9b0e5b123456",
  "firstName": "Иван",
  "lastName": "Иванов",
  "email": "ivan@example.com",
  "dob": "1995-01-23T00:00:00.000Z",
  "role": "USER",
  "isActive": true
}
```

---

### Получение списка пользователей

```bash
curl -X GET http://localhost:4000/users \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

**Пример ответа:**

```json
[
  {
    "id": "64ffae3a7d6c9b0e5b123456",
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com",
    "dob": "1995-01-23T00:00:00.000Z",
    "role": "USER",
    "isActive": true
  }
]
```

---

### Блокировка пользователя

```bash
curl -X PATCH http://localhost:4000/users/64ffae3a7d6c9b0e5b123456/block \
-H "Authorization: Bearer JWT_TOKEN_HERE"
```

**Пример ответа:**

```json
{
  "id": "64ffae3a7d6c9b0e5b123456",
  "isActive": false
}
```

---

## Структура проекта

```
src/
  controllers/       // обработчики маршрутов
  dtos/              // типы запросов/ответов
    auth/
    user/
    common/
  middlewares/       // auth, error
  models/            // Mongoose модели
  routes/            // маршруты
  schemas/           // Zod схемы для валидации
  services/          // логика работы с БД
  types/             // общие типы
  utils/             // вспомогательные функции
  server.ts          // точка входа
```

---

## Скрипты

```json
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"
```

- `--respawn` — полностью перезапускает сервер при изменениях
- `--transpile-only` — пропускает проверку типов для быстрого dev

Для продакшна: сначала компилировать `tsc`, затем запускать Node на JS.
