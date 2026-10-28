<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">NestJS Boilerplate</h1>

<p align="center">
  A scalable and production-ready NestJS boilerplate with TypeORM, migrations, logging, and modular architecture.
</p>

---

## Features

- Modular architecture (auth, user, etc.)
- TypeORM integration with migrations
- Global exception handling
- Winston logging setup
- Environment-based configuration
- Scalable folder structure
- Unit & E2E testing setup
- Redis + BullMQ support (optional)

---

## Project Structure

```
src/
├── common/
├── config/
├── modules/
├── shared/
├── test/
├── app.module.ts
└── main.ts
```

---

## Installation

```bash
yarn install
```

---

## Running the Application

```bash
yarn start:dev
```

---

## Database & Migrations

```bash
# Generate a migration
yarn migration:generate src/config/migrations/<name>

# Run migrations
yarn migration:run

# Revert last migration
yarn migration:revert
```

---

## Testing

```bash
# Unit tests
yarn test

# End-to-end tests
yarn test:e2e
```

---

## Environment Setup

Create a `.env` file in the root directory and configure the following:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=mydb

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## License

UNLICENSED