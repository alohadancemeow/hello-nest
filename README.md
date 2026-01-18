# hello-nest

A small playground project for learning and practicing [NestJS](https://nestjs.com/).

## Goals

- Understand how NestJS structures applications (modules, controllers, providers).
- Learn how dependency injection works in NestJS.
- Practice building REST APIs with validation and error handling.
- Explore testing and debugging in a NestJS project.

## Prerequisites

- Node.js (LTS version) installed.
- Basic TypeScript knowledge (interfaces, classes, types).
- npm or yarn installed.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

2. Run the development server:

   ```bash
   npm run start:dev
   ```

3. Open the API:

- Default URL: `http://localhost:3000`
- Health check: `GET /` (usually returns a simple message).

## Project Structure (typical NestJS)

- `src/main.ts` – Application entry point, bootstraps Nest app.
- `src/app.module.ts` – Root module, imports other feature modules.
- `src/app.controller.ts` – Example controller, defines routes.
- `src/app.service.ts` – Example service, business logic layer.

As you add more features, you will typically create:

- `*.module.ts` – A module grouping related controllers and providers.
- `*.controller.ts` – Controllers that handle incoming requests.
- `*.service.ts` – Services/providers that contain core logic.

## Helpful Commands

- `npm run start` – Start in production mode.
- `npm run start:dev` – Start in watch mode for development.
- `npm run test` – Run unit tests (if configured).
- `npm run test:e2e` – Run e2e tests (if configured).
- `npm run lint` – Run linting (if configured).

## Suggested Learning Steps

- Step 1: Read through `main.ts` and `app.module.ts` to see how the app starts.
- Step 2: Create a new module (e.g. `cats`) and add a controller and service.
- Step 3: Add DTOs and validation using `class-validator` and pipes.
- Step 4: Add error handling using NestJS exception filters.
- Step 5: Connect to a database (e.g. using TypeORM or Prisma) and create entities.
- Step 6: Write unit tests for a service and controller.

## Useful Resources

- Official docs: https://docs.nestjs.com
- Awesome NestJS projects: https://github.com/nestjs/awesome-nestjs
- TypeScript handbook: https://www.typescriptlang.org/docs/handbook/intro.html

Use this project as a sandbox: break things, experiment, and rebuild to solidify your NestJS knowledge.
